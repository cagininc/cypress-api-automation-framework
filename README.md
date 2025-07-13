# PetStore API Automation Framework

This project contains automated tests for the core endpoints of the Swagger PetStore API, utilizing Cypress for robust testing and Allure Report for comprehensive, interactive reporting. Developed as part of the **TechCareer Automation Processes Bootcamp**, this framework demonstrates best practices in API test automation.

## 🌟 Features

* ** API Testing**: Includes test scenarios for Pet, User, and Store API sections.
* **CRUD Operations Validation**: Verifies the creation, reading, updating, and deletion functionalities for pets and users.
* **Detailed Reporting**: Integration with Allure Report provides  interactive, and granular test reports.
* **Dynamic Test Data**: Utilizes unique usernames and IDs to minimize test data conflicts and ensure test isolation.
* **CI/CD Ready**: Designed for integration into Continuous Integration/Continuous Delivery pipelines (e.g., Jenkins, GitHub Actions) for automated test execution.(Planned)

## 🛠️ Technologies Used

* **Cypress**
* **Allure Report**
* **Node.js**
* **npm 
* **Git / GitHub**
* **Jenkins (Planned)**

## 🚀 Setup & Installation

To run this project on your local machine, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/cagininc/cypress-api-automation-framework.git](https://github.com/cagininc/cypress-api-automation-framework.git)
    cd cypress-api-automation-framework
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Install Allure CLI (If not already installed):**
    Allure Commandline tool is required to generate and view Allure reports. Ensure you have Java Development Kit (JDK) installed on your system.

    * **macOS (with Homebrew):**
        ```bash
        brew install allure
        ```
    * **Windows (with Chocolatey):**
        ```bash
        choco install allure
        ```
    * For other operating systems, please visit the [Allure GitHub](https://github.com/allure-framework/allure2/wiki/Commands) page.

## 🧪 Test Execution

Follow these commands to execute tests and generate Allure reports:

1.  **Run Cypress Tests:**
    This command runs all tests in Headless mode (without a browser UI) and saves the Allure test results to the `allure-results` directory.

    ```bash
    npx cypress run
    ```
    * To run a specific test file:
        ```bash
        npx cypress run --spec "cypress/e2e/api/User-api/get_user_by_username.cy.js"
        ```

2.  **Generate Allure Report:**
    This command generates a readable HTML report from the raw data in the `allure-results` folder and places it in the `allure-report` directory. The `--clean` flag ensures previous reports are cleared.

    ```bash
    allure generate allure-results --clean
    ```

3.  **View Allure Report:**
    This command opens the generated report in your default web browser.

    ```bash
    allure open
    ```

## 📊 Test Coverage

This project provides automated tests for the following key sections and endpoints of the Swagger PetStore API:

### 🐶 Pet API Endpoints

* 🏷️ **`POST /pet` - Create a New Pet**: Verifies that a new pet can be successfully added to the store.
* 🔍 **`GET /pet/{petId}` - Find Pet by ID**: Verifies that details of a specific pet can be successfully retrieved using its ID.
* ✏️ **`PUT /pet` - Update an Existing Pet**: Verifies that an existing pet's information can be successfully updated.
* 🗑️ **`DELETE /pet/{petId}` - Delete a Pet**: Verifies that a specific pet can be successfully deleted using its ID. Includes verification of its non-existence after deletion.
* 📊 **`GET /pet/findByStatus` - Find Pets by Status**: Verifies that pets with a specific status (`available`, `pending`, `sold`) can be successfully listed.
* 🖼️ **`POST /pet/{petId}/uploadImage` - Upload Pet Image**: Verifies that an image can be successfully uploaded for a specific pet.

### 👤 User API Endpoints

* ➕ **`POST /user` - Create a New User**: Verifies that a new user account can be successfully created.
* 🔍 **`GET /user/{username}` - Get User by Username**: Verifies that a user's details can be successfully retrieved using their username.
* ✏️ **`PUT /user/{username}` - Update Existing User**: Verifies that an existing user's information can be successfully updated using their username.
* 🗑️ **`DELETE /user/{username}` - Delete User**: Verifies that a user account can be successfully deleted using their username.
* 🔑 **`GET /user/login` - User Login**: Verifies successful user login with valid credentials.
* 🚪 **`GET /user/logout` - User Logout**: Verifies that a user can successfully log out of their session.

### 🛒 Store API Endpoints

* 🛍️ **`POST /store/order` - Place an Order**: Verifies that a new order for a pet can be successfully placed.
* 🔍 **`GET /store/order/{orderId}` - Get Order by ID**: Verifies that details of a specific order can be successfully retrieved using its ID.
* 🗑️ **`DELETE /store/order/{orderId}` - Delete Order**: Verifies that a specific order can be successfully deleted using its ID.
* 📦 **`GET /store/inventory` - Get Store Inventory**: Verifies that the pet inventory status by status (e.g., `sold`, `pending`, `available`) can be successfully retrieved.

## ⚠️ Known Issues & API Behavior

These tests are executed against the Swagger PetStore API, which is a public demo API. Some observed API behaviors are inherent to the API itself rather than issues in the test code:

* **Data Inconsistency / Delay**: Newly created users or pets may not be immediately accessible via GET requests after a POST operation, or deleted items might remain visible for a short period.
* **Unexpected Status Codes**: For some delete operations, a 200 (OK) status code might be returned instead of the more expected 404 (Not Found). The tests are designed to accommodate these scenarios.

These points do not affect the robustness of the tests but reflect the nature of the API. Tests are designed to handle such scenarios where possible and document these behaviors in the reports.

## 🖼️ Allure Report Screenshots

To provide a visual overview of the generated Allure Reports:

![Allure Report Overview Screenshot](./Allure-report1.png)
![Allure Report Test Details Screenshot](./Allure-report2.png)



---
