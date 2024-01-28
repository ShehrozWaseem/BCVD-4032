const express = require("express");
const router = express.Router();
const compile = require("../../ethereum/compile");
const deploy = require("../../ethereum/deploy");
const fs = require('fs');
const path = require('path');

const mntDirectory = path.resolve('/mnt');

const filePath = path.join(mntDirectory, 'kubVolume.txt');

// const filePath = '../../kubVolume.txt'; 
// const kubVolumePat = '../'; 
// Compile the contract
router.post("/compile", async function (req, res, next) {
  try {
    const result = compile();
    fs.appendFileSync(filePath, result, 'utf-8');
    console.log('Data appended successfully.');
    res.send(result);
  } catch (error) {
    console.error('Error appending data:', error.message);
    res.send("failed ");
    // Handle the error as needed
  }

});

// Deploy the contract
router.post("/deploy", async function (req, res, next) {
  try {
    const result = await deploy("Namaste Dockercon 2022!");
    fs.appendFileSync(filePath, JSON.parse(result).address, 'utf-8');
    res.send(JSON.parse(result).address);
    console.log('Data appended successfully.');
  } catch (error) {
    console.error('Error appending data:', error.message);
    res.send("failed ");
    // Handle the error as needed
  }
});

router.get("/test", async function (req, res, next) {
  console.log(filePath)
  try {
    fs.appendFileSync(filePath, 'hahahah', 'utf-8');
    console.log('Data appended successfully.');
    res.send("this is a test url 3 haha 1.0");
  } catch (error) {
    console.error('Error appending data:', error.message);
    res.send("failed noob");

    // Handle the error as needed
  }
});

module.exports = router;
