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
# ./test.sh <arg> [line]
#
#--------------------------------------------------------------------------------#


#----------------------------------- Options ------------------------------------#
#
# arg :
#  * -h, -help :       	Displays this help
#  * -s, -short :   	Displays the short version of the test
#  * -d, -details :    	Displays the detailed version of the test
#  * -l, -line :      	Execute the line [line] of the file request.txt
#
# [line] : Can only be used with the -line option
#  
# On Windows : sed -i 's/\r$//' ./test.sh 
# OR dos2unix ./test.sh
#
#--------------------------------------------------------------------------------#


#----------------------------------- Authors ------------------------------------#
#
# Sébastien HERT
#
#--------------------------------------------------------------------------------#


#------------------------------- Global Variables -------------------------------#

file="./request.txt"
lenTitle=200
nbLine=1
command=""
statusExpected=""
expected=""
status=""
output=""
error="False"

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
	###
	# Description : Reads the output
	#
	# Input :
	# - None
	#
	# Output :
	# - Updating global variables :
	# 	* command
	# 	* statusExpected
	# 	* status
	# 	* output
	#
	# Authors :
	# - Sébastien HERT
	###

	command=$(echo $line | cut -d';' -f1 )

	expected=$(echo $(echo $line | cut -d';' -f2 ))

	statusExpected=$(echo $(echo $line | cut -d';' -f3 | sed 's/[^0-9]//g'))

	fullOutput=${command/-X/'--write-out %{http_code} --silent -X'}
	
	output=$($fullOutput)


	status=${output: -3}
	output=${output:0: -3}
}

shortDisplay(){
	###
	# Description : Displays necessary information on the terminal
	#
	# Input :
	# - None
	#
	# Output :
	# - Displays in terminal
	#
	# Authors :
	# - Sébastien HERT
	###

	if [[ $status == $statusExpected ]]; then
		printf "\e[0m %-6s \e[36mCommand Tested : \e[0m%-130s \e[36mExpected : \e[0m%-5s \e[36mOutput : \e[0m%-5s \e[36mStatus : " "($nbLine)" "$command" "$statusExpected" "$status"
		printf "\e[32mOK\n"
	else
		printf "\e[0m %-6s \e[36mCommand Tested : \e[31m%-130s \e[36mExpected : \e[32m%-5s \e[36mOutput : \e[31m%-5s \e[36mStatus : " "($nbLine)" "$command" "$statusExpected" "$status"
		printf "\e[31mKO\n"
	fi
}

completeDisplay(){
	###
	# Description : Displays more information on the terminal
	#
	# Input :
	# - None
	#
	# Output :
	# - Displays in terminal
	#
	# Authors :
	# - Sébastien HERT
	###

	title "-" "Testing Command Line $nbLine"

	echo -e "\e[34mCommand Tested :\e[0m $command\n"

	echo -e "\e[34mOutput expected :\e[0m Status : $statusExpected ; $expected\n"

	if [[ $status == $statusExpected ]]; then
		echo -e -n "\e[34mOutput : \e[0m\e[32mStatus : $status ; $output\e[0m\n\n"
	else
		echo -e -n "\e[34mOutput : \e[0m\e[31mStatus : $status ; $output\e[0m\n\n"
		error="True"
	fi
}

help(){
	###
	# Description : Displays this help
	#
	# Input :
	# - None
	#
	# Output :
	# - Displays the help
	#
	# Authors :
	# - Sébastien HERT
	###

	lenTitle=80
	title "=" "REST API Tester"

	title - "Description"
    echo -e "This command allows users to test our REST API\n"


    title - "Synopsis"
    echo -e "\e[34m./test.sh <arg> [line]\n\e[0m"

    echo -e "<arg> :"
    echo -e " * -h, -help :       	Displays this help"
    echo -e " * -s, -short :   		Displays the short version of the test"
    echo -e " * -d, -details :    	Displays the detailed version of the test"
    echo -e " * -l, -line :      	Execute the line [line] of the file request.txt\n"

    echo -e "[line] :"
    echo -e "   Can only be used with the -line option\n"

    title - "Authors"
	echo -e " * Tony CHOUTEAU"
    echo -e " * Sébastien HERT\n"
}


#--------------------------------------------------------------------------------#


#------------------------------------- Main -------------------------------------#

# Stops the script on error
set -e

# Checks if the end of the File is a blank line
checkEndOfFile

# Resets the data directories
reset

# The user wants to see the short version
if [[ $# == 0 || $1 == '-s' || $1 == '-short' ]]; then
	title "=" "REST API Tester"
	while read line; do
		if [[ "${line::1}" == [a-z] ]]; then
			readingOutput
			shortDisplay
		fi
		(( nbLine++))
	done < $file
	echo -e ""

# The user wants to see the detailed version
elif [[ $# == 1 && ( $1 == '-d' || $1 == '-details' ) ]]; then
	title "=" "REST API Tester"
	while read line; do
		if [[ "${line::1}" == [a-z] ]]; then
			readingOutput
			completeDisplay
		fi
		# Stops the script if the status and the status expected are different
		if [[ $error == "True" ]]; then
			echo -e "\e[93mSomething went wrong and the tester stops running. Please check your request line $nbLine before trying again.\n\e[0m"
			break
		fi
		(( nbLine++))
	done < $file

# The user wants to see the output of an unique line
elif [[ $# == 2 && ( $1 == '-l' || $1 == '-line') ]]; then
	title "=" "REST API Tester"
	while read line; do
		lineRead="False"
		if [[ $nbLine == $2 ]]; then
			lineRead="True"
			if [[ "${line::1}" == [a-z] ]]; then
				readingOutput
				completeDisplay

			# The line isn't a command
			else
				echo -e "\e[93mCannot read the line $2, please make sure it's a command line in $file\e[0m\n"
			fi
		fi
		(( nbLine++))
	done < $file

	# No line has been read because the file ended before matching the line
	if [[ $lineRead == "False" ]]; then
		echo -e "\e[93mCannot read the line $2, please make sure it exists\e[0m\n"
	fi

# The user wants to show this help
elif [[ $# == 1 && ( $1 == '-h' || $1 == '-help' ) ]]; then
	help

# Input has not been recognized
else
	echo -e "\e[93mIt looks like something went wrong, please use -help to display the help\e[0m\n"
fi

title End

# Resets the data directories
reset

#--------------------------------------------------------------------------------#


#================================================================================#