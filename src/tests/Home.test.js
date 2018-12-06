import { Builder, By } from 'selenium-webdriver';
require('geckodriver')

const rootUrl = "http:/localhost:3000";
const waitUntilTime = 20000;

let driver; // global handle to the Selenium Web Driver

afterAll(() => {
    driver.quit();
}, waitUntilTime);

beforeAll(() => {
    driver = new Builder().forBrowser("firefox").build();
    driver.getWindowHandle();
}, waitUntilTime);

beforeEach(() => {
    driver.get(rootUrl);
}, waitUntilTime)

// Note: If the promise that driver.getCurrentUrl() returns is not unwrapped, 
//      then the test fails even if the URL is correct
test.each([
    ['Dice Roller','/dice'],
    ['HP Tracker', '/hp'],
    ['Combat Log', '/log'],
    ['Character Profile', '/profile'],
    ['Custom Items', '/custom'],
    ['Search', '/search']])(
    'Link with text %s has url %s',
        (linkText, linkUrl) => {
            driver.findElement(By.linkText(linkText)).click();
            driver.getCurrentUrl().then((url) => { 
                expect(url).toBe(rootUrl + linkUrl);
            })
        }, waitUntilTime);