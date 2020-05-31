# **REST API project**

## **Description**

description

## **Installation**

This project use node, make sure you have installed it, then do :

Install all modules : 

```bash
npm install
```

Start the Server :
```
npm start
```

## **Use the API**

[Documentation API](./tests/DOC.MD)

## **Testing Script**

The script [test.sh](test.sh) allow you to test some requests written in [request.txt](request.txt).

### Synopsis

./chef.sh \<arg> [line]

\<arg> :
* -h, -help : *Displays the help*
* -s, -short : *Displays the short version of the test*
* -d, -details : *Displays the detailed version of the test*
* -l, -line : *Execute the line [line] of the file request.txt*

[line] :

* *Can only be used with the -line option*

## **Potential Errors**

If you are using windows, [test.sh](test.sh) may encounter this error :
```Unknown command "\r$"```. To solve this error, you can use one of the following commands : ```sed -i 's/\r$//' test.sh request.txt``` OR ```dos2unix test.sh; dos2unix request.txt```.

## **Author**

* Tony CHOUTEAU
* Sébastien HERT