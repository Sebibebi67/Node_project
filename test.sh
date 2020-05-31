#!/bin/bash


#=================================== test.sh ====================================#


#--------------------------------- Description ----------------------------------#
#
# This script tests the REST API and some commands you could use on it.
# It tests all the command written in request.txt
#
#--------------------------------------------------------------------------------#


#----------------------------------- Synopsis -----------------------------------#
#
# ./test.sh
#
#--------------------------------------------------------------------------------#


#----------------------------------- Options ------------------------------------#
#
# There isn't any option for this script
# 
# On Windows : sed -i 's/\r$//' ./test.sh 
# OR dos2unix ./test.sh
# 
# details, simplify, line, help
#
#--------------------------------------------------------------------------------#


#----------------------------------- Authors ------------------------------------#
#
# Sébastien HERT
#
#--------------------------------------------------------------------------------#


#------------------------------- Global Variables -------------------------------#

file="./request.txt"
lenTitle=80
nbLine=1
command=""
statusExpected=""
expected=""
status=""
output=""

#--------------------------------------------------------------------------------#


#---------------------------------- Functions -----------------------------------#

title(){
	###
	# Description : Displays a Title in the terminal
	#
	# Input :
	# - The separator (=,-,*, etc)
	# - The title to display as a String
	#
	# Output :
	# - Display in a shell terminal
	#
	# Authors :
	# - Sébastien HERT
	###

	if [ $# -eq 0 ]; then
        param="Titre"
        id="="
    elif [ $# -eq 1 ]; then
        param=$1
        id="="
    elif [ $# -eq 2 ]; then
        param=$2
        id=$1
    else
        echo error
    fi

    lenParam=${#param}
    lenEq1=$(( ($lenTitle-$lenParam)/2 -1 ))
    lenEq2=$(( $lenTitle-$lenParam-$lenEq1-2 ))
    title=""
    for (( i = 0; i < $lenEq1; i++ )); do
        title="${title}$id"
    done
    title="${title} $param "
    for (( i = 0; i < $lenEq2; i++ )); do
        title="${title}$id"
    done

    echo -e "\e[35m\e[1m${title}\n\e[0m"
}

checkEndOfFile(){
	###
	# Description : Checks if a file finishes with an empty line
	#
	# Input :
	# - The file
	#
	# Output :
	# - None, but adding a new line if its necessary
	#
	# Authors :
	# - Sébastien HERT
	###

	end=$( tail -n 1 $file )
	if [[ $end != "" ]]; then
		echo "" >> $file
	fi
}

reset(){
	###
	# Description : Resets the data directories
	#
	# Input :
	# - None
	#
	# Output :
	# - Resets the data directories
	#
	# Authors :
	# - Sébastien HERT
	###

	directories="./data/mouths ./data/brains ./data/bots"
	if [[ ! -d ./data ]]; then
		mkdir ./data
	fi
	for d in $directories; do
		if [[ -d $d ]]; then
			rm -r $d
		fi
		if [[ ! -d $d ]]; then
			mkdir $d
		fi
	done
}

readingOutput(){
	command=$(echo $line | cut -d';' -f1 )

	expected=$(echo $(echo $line | cut -d';' -f2 ))

	statusExpected=$(echo $(echo $line | cut -d';' -f3 | sed 's/[^0-9]//g'))

	fullOutput=${command/-X/'--write-out %{http_code} --silent -X'}
	
	output=$($fullOutput)


	status=${output: -3}
	output=${output:0: -3}
}

shortDisplay(){
	echo short
}

completeDisplay(){
	title "-" "Testing Command Line $nbLine"

	echo -e "\e[34mCommand Tested :\e[0m $command\n"

	echo -e "\e[34mOutput expected :\e[0m Status : $statusExpected ; $expected\n"

	if [[ $status == $statusExpected ]]; then
		echo -e -n "\e[34mOutput : \e[0m\e[32mStatus : $status ; $output\e[0m\n\n"
	else
		echo -e -n "\e[34mOutput : \e[0m\e[31mStatus : $status ; $output\e[0m\n\n"
	fi
}


#--------------------------------------------------------------------------------#


#------------------------------------- Main -------------------------------------#

set -e

checkEndOfFile

reset

title "=" "Testing REST API"

if [[ $# == 0 || $1 == '-n' || $1 == '-normal' ]]; then
	while read line; do
		if [[ "${line::1}" == [a-z] ]]; then
			readingOutput
			shortDisplay
		fi
		(( nbLine++))
	done < $file
elif [[ $# == 1 && ( $1 == '-d' || $1 == '-details' ) ]]; then
	while read line; do
		if [[ "${line::1}" == [a-z] ]]; then
			readingOutput
			completeDisplay
		fi
		(( nbLine++))
	done < $file
elif [[ $# == 2 && ( $1 == '-l' || $1 == '-line') ]]; then
	while read line; do
		lineRead="False"
		if [[ $nbLine == $2 ]]; then
			lineRead="True"
			if [[ "${line::1}" == [a-z] ]]; then
				readingOutput
				completeDisplay
			else
				echo -e "\e[93mCannot read the line $2, please make sure it's a command line in $file\e[0m\n"
			fi
		fi
		(( nbLine++))
	done < $file
	if [[ $lineRead == "False" ]]; then
		echo -e "\e[93mCannot read the line $2, please make sure it exists\e[0m\n"
	fi
else
	echo toto
fi

title End

#--------------------------------------------------------------------------------#


#================================================================================#







