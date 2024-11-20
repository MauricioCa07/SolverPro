# UNIVERSIDAD EAFIT
## COMPUTER AND SYSTEMS DEPARTMENT

### PROJECT SELECTION
**First Report**

**Objective:** Adequately define the possible project to be developed during the semester.

### General Objective:
Develop SolverPro, an interactive web platform that allows students, engineers, and professionals to solve complex mathematical problems by implementing various numerical methods, providing accurate and real-time results, and promoting the learning of numerical analysis.

### Specific Objectives:
- **Implement Multiple Numerical Methods:** Integrate a variety of numerical methods into SolverPro, such as the Newton-Raphson method, bisection, interpolation, numerical differentiation, and numerical integration, among others.
- **Design an Intuitive User Interface:** Create a friendly and easy-to-use graphical interface that allows users to select and apply numerical methods efficiently.
- **Develop Real-Time Functionality:** Ensure that SolverPro provides immediate and accurate results to the user, improving the user experience.
- **Promote Learning of Numerical Analysis:** Provide educational resources and detailed explanations about each numerical method implemented, helping users better understand the techniques and their application.
- **Implement an English Section:** Ensure that the platform is available in English, expanding its accessibility and usefulness to a global audience.
- **Optimize System Performance and Scalability:** Ensure that the platform can handle multiple users simultaneously without compromising the speed or accuracy of calculations.

### Project Name: SolverPro  
**Website URL (GitHub repository):** [SolverPro GitHub Repository](https://github.com/MauricioCa07/SolverPro.git)

**Course:** Numerical Analysis  
**Responsible Teacher:** Edwar Samir Posada Murillo  
**Delivery Date of This Report:** 04/08/2024  

### Team Members:
- Mauricio Carrillo Carvajal
- Sebastian Cano
- Manuel Quintero
- Juan Diego Llorente

### Project Description:
SolverPro is an online calculator that provides access to different numerical methods, offering a wide catalog so you can choose the method that best suits your project. Designed for students, engineers, and professionals, SolverPro simplifies the process of solving complex math problems efficiently and accurately, featuring an intuitive interface and real-time results.

We will be using technologies/languages such as JavaScript, HTML, and CSS with the React library for the front-end of the application. For the backend, we will use JavaScript along with the Node.js runtime and the Express framework. The database we will use is MongoDB.

### Possible Added Values:
- **English Support:** Platform available in English for a broader audience.
- **LaTeX Support:** Implement LaTeX for improved mathematical representation.

---

## SolverPro Install/Execution Guide
### Team:
- Mauricio Carrillo
- Sebastián Cano
- Juan Diego Llorente
- Manuel Quintero

### Requirements:
- **Node.js** (Run environment)
- **npm** (Package manager)
- **GitHub repo** (Source code)
- **Victory** (Library for plots)
- **Plotly React** (Library for plots)

### Steps to Install and Run SolverPro

#### 1. Install Node.js:
- Go to [Node.js Official Website](https://nodejs.org/en/) and download the latest Long Term Support (LTS) version of Node.js.
- Execute the wizard downloaded and follow through the stages.
- After installation is complete, verify the installation by running the commands:
  ```bash
  node -v
  npm -v
  ```

#### 2. Clone GitHub Repository:
- You will need the repository link: [SolverPro GitHub Repository](https://github.com/MauricioCa07/SolverPro.git).
- Navigate to a directory of your preference on your computer and create a new folder with any name.
- Open the command prompt and navigate to the folder you just created.
- Run the command:
  ```bash
  git init
  ```
  This will create an empty local repository.
- Then, run the command to clone the repository:
  ```bash
  git clone https://github.com/MauricioCa07/SolverPro.git
  ```

#### 3. Install Dependencies:
- In the same directory, run the following command to install dependencies:
  ```bash
  npm install
  ```

#### 4. Install Libraries (If Needed):
- If required during execution, run the commands to install additional libraries:
  ```bash
  npm install react-plotly.js plotly.js
  npm install victory
  ```

#### 5. Run the Development Server:
- To run the project locally, execute the following command:
  ```bash
  npm run dev
  ```
- This will return a URL of a localhost. Copy it and paste it in your browser to access the application.
