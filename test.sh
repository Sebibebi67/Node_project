#!/bin/bash


#=================================== test.sh ====================================#


#--------------------------------- Description ----------------------------------#
#
#
#
#--------------------------------------------------------------------------------#


#----------------------------------- Synopsis -----------------------------------#
#
# ./test.sh
#
#--------------------------------------------------------------------------------#


#----------------------------------- Options ------------------------------------#
#
# Option : Description
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

#--------------------------------------------------------------------------------#


#---------------------------------- Functions -----------------------------------#

title(){
	if [ $# -eq 0 ]; then
		param="Title"
	else
		param=$*
	fi

	lenParam=${#param}
	# echo $lenParam
	lenEq1=$(( ($lenTitle-$lenParam)/2 -1 ))
	lenEq2=$(( $lenTitle-$lenParam-$lenEq1-2 ))
	title=""
	for (( i = 0; i < $lenEq1; i++ )); do
		title="${title}="
	done
	title="${title} $param "
	for (( i = 0; i < $lenEq2; i++ )); do
		title="${title}="
	done

	echo -e "\e[35m\e[1m${title}\n\e[0m"
}

subtitle(){
		if [ $# -eq 0 ]; then
		param="Subtitle"
	else
		param=$*
	fi

	lenParam=${#param}
	# echo $lenParam
	lenEq1=$(( ($lenTitle-$lenParam)/2 -1 ))
	lenEq2=$(( $lenTitle-$lenParam-$lenEq1-2 ))
	title=""
	for (( i = 0; i < $lenEq1; i++ )); do
		title="${title}-"
	done
	title="${title} $param "
	for (( i = 0; i < $lenEq2; i++ )); do
		title="${title}-"
	done

	echo -e "\e[93m${title}\n\e[0m"
}

commandTested(){
	echo -e "\e[34mCommand Tested :\e[0m $*\n"
}

expected(){
	echo -e "\e[34mOutput expected :\e[0m $*\n"
}

output(){
	echo -e "\e[34mOutput :\e[0m $($*)"
	echo -e ""
}


checkEndOfFile(){
	end=$( tail -n 1 $file )
	if [[ $end != "" ]]; then
		echo "" >> $file
	fi
}

error(){
	echo -e "\e[31mError\e[0m\n"
}

success(){
	echo -e "\e[32mSuccess\e[0m\n"
}


#--------------------------------------------------------------------------------#


#------------------------------------- Main -------------------------------------#

set -e

checkEndOfFile

title Testing REST API


while read line
do
	if [[ "$line" != "" ]]; then
		command=$(echo $line | cut -d';' -f1 )
		expected=$(echo $(echo $line | cut -d';' -f2 ))

		executedCommand=$(echo $($command))


		subtitle Testing Command Line $nbLine

		commandTested $command

		expected $expected

		output $command

		if [[ "$expected" == "$executedCommand" ]]; then
			success
		else
			error
		fi

	fi
	(( nbLine++))
done < $file


title End

#--------------------------------------------------------------------------------#


#================================================================================#