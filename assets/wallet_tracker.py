from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
import platform
import sys

# Constants
token_address = "B6CSRB5zkPPxtrMWQSKqiPcKo7RZfTfDqsZH5fRWH3AM"
partial_wallet = "E4GxQQSg"  # The wallet address to search for
base_url = f"https://solscan.io/token/{token_address}#transactions"  # Correct URL

# Set up Selenium options for headless mode
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode (no browser window)
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")

# Path to your ChromeDriver (make sure it's installed and in your PATH)
service = Service(r'C:\Users\joaop\Documents\chromedriver-win64\chromedriver.exe')

# Specify the full path for the output file (absolute path)
output_file_path = os.path.join(os.getcwd(), "found_wallets.txt")

# Debugging: Print file path where it's going to be saved
print(f"Output file will be saved to: {output_file_path}")

def clear_console():
    # Function to clear the console
    if platform.system() == "Windows":
        os.system('cls')
    else:
        os.system('clear')

def find_wallet():
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(base_url)

    # Wait for the "Transactions" button to be clickable and click it
    try:
        transactions_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "/html/body/div/div[1]/div[3]/div[1]/div[2]/div[2]/div[2]/div/div[1]/div/div/button[2]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", transactions_button)
        time.sleep(1)
        transactions_button.click()
        print("Clicked on Transactions button.")
    except Exception as e:
        print(f"Error clicking 'Transactions' button: {e}")
        driver.quit()
        return

    page = 1

    while True:
        print(f"Checking page {page}...")

        # Wait for the page to load
        time.sleep(3)

        # Find wallet address <a> elements
        wallet_elements = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//td[contains(@class, 'h-12')]//a"))
        )

        # Loop through each wallet address on the page
        for wallet in wallet_elements:
            wallet_text = wallet.text.strip()
            full_wallet_url = wallet.get_attribute("href")  # This will get the full URL from the href attribute
            if partial_wallet in wallet_text:
                print(f"Found matching wallet: {wallet_text}")
                print(f"Full wallet address URL: {full_wallet_url}")

                # Extract the wallet address from the href attribute (URL format: /account/<address>)
                wallet_address = full_wallet_url.split("/account/")[-1]
                print(f"Extracted full wallet address: {wallet_address}")

                # Check if the file exists
                if os.path.exists(output_file_path):
                    print("File exists. Writing to it...")
                else:
                    print(f"File doesn't exist. Creating new file: {output_file_path}")

                # Save the full address to the text file
                try:
                    with open(output_file_path, "a") as file:
                        file.write(f"Found matching wallet: {wallet_address}\n")
                    print(f"Wallet saved: {wallet_address}")
                except Exception as write_error:
                    print(f"Error saving to file: {write_error}")
                
                # Return the address and stop the script
                driver.quit()
                return wallet_address

        # Clear console every 5 pages to reduce clutter
        if page % 5 == 0:
            clear_console()

        # Wait for the "Next" button to be visible and clickable and click it to go to the next page
        try:
            next_button = WebDriverWait(driver, 20).until(
                EC.element_to_be_clickable((By.XPATH, "/html/body/div/div[1]/div[3]/div[1]/div[2]/div[2]/div[2]/div/div[3]/div/div/div[3]/div/div[2]/button[2]"))
            )

            # Scroll to the "Next" button
            driver.execute_script("arguments[0].scrollIntoView(true);", next_button)
            time.sleep(1)  # Let the page finish rendering the button

            # Click using JavaScript
            driver.execute_script("arguments[0].click();", next_button)

            page += 1
            print("Clicked on Next button.")
        except Exception as e:
            print(f"Next button not found. Reached the end of the pages. Error: {e}")
            print("Continuing search through the next page...")

    driver.quit()

# Run the function
find_wallet()



