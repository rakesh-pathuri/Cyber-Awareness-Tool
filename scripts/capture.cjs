const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to Home...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(screenshotsDir, 'home.png') });

  console.log('Navigating to Student Dashboard...');
  await page.goto('http://localhost:5173/student', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, 'student_dashboard.png') });

  console.log('Navigating to Teacher Dashboard...');
  await page.goto('http://localhost:5173/teacher', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, 'teacher_dashboard.png') });

  // Let's capture the Phishing simulator in Teacher Presentation mode
  console.log('Capturing Presentation Mode Simulator...');
  // Click on "Phishing Simulator" in Teacher dashboard
  const [phishingBtn] = await page.$x("//button[contains(., 'Phishing Simulator')]");
  if (phishingBtn) {
    await phishingBtn.click();
    await page.waitForTimeout(1000);
    // Click Presentation Mode
    const [presentationBtn] = await page.$x("//button[contains(., 'Presentation Mode')]");
    if (presentationBtn) {
      await presentationBtn.click();
      await page.waitForTimeout(1000);
      // Click Next to go to the simulator
      const [nextBtn] = await page.$x("//button[contains(., 'Next')]");
      if (nextBtn) {
        await nextBtn.click();
        await page.waitForTimeout(1000);
        await nextBtn.click(); // Slide 2
        await page.waitForTimeout(1000);
        await nextBtn.click(); // Slide 3 (Simulation)
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(screenshotsDir, 'simulator.png') });
      }
    }
  }

  await browser.close();
  console.log('Done capturing screenshots.');
}

capture().catch(console.error);
