This is a program that a made for a friend to transform some table.

It transforms a table like this

```csv
Nome do Convênio,Especialidade,Cidade,Telefone Principal
foo,bar,townA,123
faa,bar,townA,1234
foo1,baz,townA,124
foo2,bar,townB,1235
```

Into a text file like this

```text
townA
bar
faa 1234
foo 123
baz
foo1  124
townB
bar
foo2  1235
```

Run it like this:

```shell
yarn install
./index.js /path/to/csv/file.csv -o output-file.txt
```
