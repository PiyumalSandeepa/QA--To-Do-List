import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { tmpdir } from "os";
import process from "process";
import { randomUUID } from "crypto";

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error(`Server at ${url} not ready within ${timeout}ms`);
}

(async function taskTest() {
  // Try different ports for frontend server
  const possibleUrls = [
    "http://localhost:4173", // Vite preview server (CI)
    "http://localhost:5174", // Vite dev server
    "http://localhost:5173"  // Default Vite dev server
  ];

  let baseUrl = null;
  for (const url of possibleUrls) {
    try {
      console.log(`Checking server at ${url}...`);
      await waitForServer(url, 5000);
      baseUrl = url;
      console.log(`Found running server at ${baseUrl}`);
      break;
    } catch {
      console.log(`Server not found at ${url}`);
    }
  }

  if (!baseUrl) {
    console.error("❌ No frontend server found. Please start the frontend server first.");
    process.exit(1);
  }

  // Configure Chrome options for CI/headless environment
  const chromeOptions = new chrome.Options();

  // Create truly unique user data directory using UUID and process ID
  const uniqueDir = `${tmpdir()}/selenium_${process.pid}_${Date.now()}_${randomUUID()}`;
  console.log(`Using Chrome user data directory: ${uniqueDir}`);

  // CI-friendly Chrome options
  chromeOptions.addArguments(
    `--user-data-dir=${uniqueDir}`,
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-web-security',
    '--disable-features=VizDisplayCompositor',
    '--disable-extensions',
    '--no-first-run',
    '--disable-default-apps'
  );

  // Add headless mode for CI environments
  if (process.env.CI || process.env.GITHUB_ACTIONS) {
    chromeOptions.addArguments(
      '--headless=new',
      '--window-size=1920,1080'
    );
    console.log("Running in headless mode for CI");
  }

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    console.log(`Opening browser and navigating to ${baseUrl}...`);
    //  Open the Task Add page
    await driver.get(baseUrl);

    // Fill in task title
    const titleInput = await driver.wait(
      until.elementLocated(By.css("input[placeholder='Enter task title']")),
      5000
    );
    await titleInput.sendKeys("Automated Test Task");

    // Fill in task description
    const descInput = await driver.findElement(
      By.css("textarea[placeholder='Enter task description']")
    );
    await descInput.sendKeys("Task added via Selenium test");

    // Click Save Task button
    const saveButton = await driver.findElement(By.xpath("//button[text()='Save Task']"));
    await saveButton.click();

    // Wait until redirected to /tasks page
    await driver.wait(until.urlContains("/tasks"), 5000);

    console.log("✅ TaskAddPage Selenium test passed!");

    // verify the added task on the Task List page
    console.log("Verifying Task List...");

    // Navigate to Task List page
    await driver.get(`${baseUrl}/tasks`);

    // Wait for the task list to appear
    const taskList = await driver.wait(
      until.elementLocated(By.css("ul")), // assuming tasks are listed in <ul> tag
      5000
    );

    //  Check if the added task appears in the list
    const tasks = await taskList.findElements(By.css("li")); // assuming each task is in <li>
    let taskFound = false;

    for (let task of tasks) {
      const title = await task.findElement(By.css("h3")).getText(); // assuming task title is in <h3>
      if (title === "Automated Test Task") {
        taskFound = true;
        break;
      }
    }

    // Assert that the task is found
    if (taskFound) {
      console.log("✅ TaskListPage Selenium test passed!");
    } else {
      console.error("❌ TaskListPage Selenium test failed: Task not found in the list.");
      process.exit(1);
    }

  } catch (error) {
    console.error("❌ Selenium test failed:", error);
    process.exit(1);
  } finally {
    console.log("Cleaning up browser session...");
    try {
      await driver.quit();
    } catch (cleanupError) {
      console.warn("Warning: Error during cleanup:", cleanupError.message);
    }
  }
})();
