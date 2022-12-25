#!/usr/bin/env node

const argv = process.argv
const {
  name,
  version
} = require("../package.json")
const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")

const file2obj = (filePath) => {
  filePath = path.resolve(__dirname, filePath)
  return JSON.parse(fs.readFileSync(filePath).toString())
}

const obj2file = (dataObj) => {
  fs.writeFileSync(path.resolve(__dirname, "./data.json"), JSON.stringify(dataObj))
}

const data = file2obj("./data.json")

if (argv.indexOf("-V") !== -1) {
  console.log(`${name} v${version}`)
} else if (argv.indexOf("ls") !== -1) {
  exec("npm config get registry", (err, stdout, stderr) => {
    if (err) {
      console.log(`err：${err}`);
      return;
    }

    for (let key in data) {
      console.log(`${data[key].trim() === stdout.trim() ? "* " : ""}${key} => ${data[key]}`);
    }
  })
} else if (argv.indexOf("add") !== -1) {
  let index = argv.indexOf("add");
  const key = argv[++index];
  const value = argv[++index];

  if (data[key]) {
    console.log(`${key} has already been in list`);
  } else {
    data[key] = value;
    obj2file(data);
    console.log("success added registry");
  }
} else if (argv.indexOf("del") !== -1) {
  let index = argv.indexOf("del");
  const key = argv[++index];

  delete data[key];
  obj2file(data);
  console.log("success deleted registry");
} else if (argv.indexOf("use") !== -1) {
  let index = argv.indexOf("use");
  const key = argv[++index];

  if (data[key]) {
    exec(`npm config set registry ${data[key]}`, (err) => {
      if (err) {
        console.error(`exec error：${err}`);
        return;
      }
      console.log(`set registry success：${data[key]}`);
    });
  } else {
    console.log(`${key} is not in j-nrm list`);
  }
} else if (argv.indexOf("-h") !== -1) {
  console.log(`
  add:j-nrm add key value can add registry address to list
  del:j-nrm del key can delete key of list
  ls:j-nrm ls can show all list
  -V:j-nrm -v can show verson
  `)
}