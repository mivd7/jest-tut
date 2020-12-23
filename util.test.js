//PART 1: Unit & Integration Tests w/ Jest
//import what you want to test from file
const { generateText, checkAndGenerate } = require('./util');
//defines single test;
//first arg: description
test('should output name and age', () => {
  //second arg: function that executes the test
  const text = generateText('Max', 30)
  //define the expected output for the test variable 
  expect(text).toBe('Max (30 years old)');
})

//check false positives, opposites
test('should not be hard-coded', () => {
  const text = generateText('', null)
  expect(text).toBe(' (null years old)')
})

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 30);
  expect(text).toBe('Max (30 years old)');
})

//PART 2: E2E Test w/ Puppeteer 
const puppeteer = require('puppeteer');

test('should create an element with user specified text content', async () => {
  jest.setTimeout(30000);
  //returns a promise
  const browser = await puppeteer.launch({
    //use a real browser?
    headless: true,
    //how fast?
    slowMo: 80,
    //set browser window size to 1920x1080
    args: ['--window-size=1920x1080']
  })

  const page = await browser.newPage();
  await page.goto('file:///Users/mivd/Documents/Code/selfstudy/testing/js-testing-introduction/index.html');
  //simulate input values;
  await page.click('input#name');
  await page.type('input#name', 'MIVD');
  await page.click('input#age');
  await page.type('input#age', '30');
  //simulate click on submit button
  await page.click('#btnAddUser');
  const endResult = await page.$eval('.user-item', el => el.textContent);
  expect(endResult).toBe('MIVD (30 years old)');
  
})