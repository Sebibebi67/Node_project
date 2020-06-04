# **REST API project**

## **Description**

This project presents a way to manage bots and how we can discuss with them. It's an API which is using REST. It allows you to create, update and manage bots, including their brain(s) *-- Rivescript files which describes their behavior --* and their mouth(s) *-- which allows them to talk on different platforms*.

## **Installation**

This project uses node, make sure you have installed it, then do :

Install all modules : 

```bash
npm install
```

Start the Server :
```
npm start
```

## **Use the API**

[Documentation API](./resources/wiki/DOC.MD)

## **Discord mouth**

[Documentation API](./resources/wiki/DISCORD.MD)

## **Web mouth**

N/A

## **Testing Script**

The script [test.sh](test.sh) allows you to test some requests written in [request.txt](request.txt).

### Synopsis

./test.sh \<arg> [line]

\<arg> :
* -h, -help : *Displays the help*
* -s, -short : *Displays the short version of the test*
* -d, -details : *Displays the detailed version of the test*
* -l, -line : *Executes the line [line] of the file request.txt*

[line] :

* *Can only be used with the -line option*

## **Potential Errors**

If you are using windows, [test.sh](test.sh) may encounter this error :
```bash
Unknown command "\r$"
```
To solve this error, you can use one of the following commands :
```bash
sed -i 's/\r$//' test.sh request.txt
``` 
OR 
```bash
dos2unix test.sh; dos2unix request.txt
```

## **Author**

* Tony CHOUTEAU
* Sébastien HERT