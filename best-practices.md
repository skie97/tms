# Stack 2.0 Best Practices

## Stack

| Library | Purpose |
| :------ | :------ |
| ReactJS (TypeScript) | Primary frontend library |
| Bootstrap/React-Bootstrap or Material UI | Primary style framework |
| React-Query | For managing queries to backend |
| React-Router | For routing of app's pages |
| React-Icons | For icons |
| Material-Table | For rendering tables |
| SharePoint Lists and Document Libraries | For storing data and assets |
| SharePoint REST API | For programmatic access to data and assets |
| SharePoint Permissions | For access control |


#### Why TypeScript Over JavaScript?
We prefer TypeScript because of the following benefits:

- Facilitates detection of errors during development
- Enforces standards by having developers write readable, self-explanatory code without additional commentary
- Exploits IDEs' in-built functionality (e.g. VSCode Intellisense) for automatic documentation and autocompletion

**CAUTION:** Although TypeScript is strongly-typed, it does not mean that the code you write is more secure than JavaScript. Type checking happens during *compile time*, as opposed to *runtime*. After transpilation, all type information is removed, since vanilla JavaScript does not use type checking. Therefore, **insecure code (e.g. unsanitised inputs) written in TypeScript will still be insecure after transpilation to JavaScript**.

## Project Structure
See the diagram below for the project structure for a standard Stack 2.0 project. The `prod-build` folder is for housing the app, bundled by `create-react-app` (CRA). The `dev` folder contains your standard CRA files.

```
.
├── prod-build              # Compiled files - similar structure to dev/build
├── dev                     # Development files
│   ├── build               #  - CRA build files
│   ├── node_modules        #  - npm modules (gitignored)
│   ├── public              #  - CRA static files
│   ├── src                 #  - CRA source files
│   ├── package-lock.json   #  - Project metadata
│   ├── package.json        #  - Project metadata
│   └── README.md           #  - CRA README
├── .gitignore
└── README.md
```


## Security
DevSecOps for Stack 2.0 takes reference from the following:

1. Open Web Application Security Project (OWASP) [Secure Coding Practices Checklist](https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf)
2. Rules for finding [JavaScript](https://rules.sonarsource.com/javascript) / [TypeScript](https://rules.sonarsource.com/typescript) vulnerabilities, bugs, security hotspots, or code smells
3. Testing: [Web Security Testing Guide](https://github.com/OWASP/wstg/)

Tools to incorporate (WIP):

1. Snyk.io
2. Jest

### Education
Selected Youtube videos for education on security matters:

1. [Web Application Security for Frontend Devs](https://www.youtube.com/watch?v=kEYYDWQPa0w)
2. [Writing Secure JavaScript](https://www.youtube.com/watch?v=Xy1K8ODZC8w)
3. [DevSecOps Course for Beginners](https://www.youtube.com/watch?v=F5KJVuii0Yw)
4. [OWASP Top 10 (Security Risks and Vulnerabilities)](https://www.youtube.com/watch?v=7UG8wE58vU8)

### JavaScript Secure Coding Practices (JS-SCP) Guide by Checkmarx Security
The [JS-SCP guide](https://checkmarx.gitbooks.io/js-scp/content/) from Checkmarx Security contextualises the OWASP Secure Coding Practices Checklist to JavaScript. The notes below provide some context for Stack 2.0 DevSecOps:

1. Input Validation:
    - Use a centralised, well-tested, and actively-maintained validation routine: [Validator.js](https://github.com/validatorjs/validator.js).
    - Validator.js has many functions for validating data, including types, ranges, and other methods (e.g. allowable characters, escaping HTML characters). It's more efficient to use this than to use vanilla JS.
    - Perform post-validation: tell the user what's wrong
    - Always treat user inputs as untrusted and unsafe data
2. Output Encoding: For safely displaying data exactly as a user typed it
    - Main threat: cross-site scripting (XSS)
    - React escapes values by default, but there are watch areas:
      - Never use `dangerouslySetInnerHTML`
      - Never create React components from user-supplied objects
      - Never use user-supplied `href` attributes, or other HTML tags with injectable attributes (link tag, HTML5 imports)
3. Databases:
    - Main threat: SQL and NoSQL injection
    - Both are nothing actionable in Stack 2.0 DevSecOps
4. Authentication and Password Management: Managed by SharePoint; nothing actionable in Stack 2.0 DevSecOps
5. Session Management: Done primarily on the backend; nothing actionable in Stack 2.0 DevSecOps
6. Access Control: Managed by SharePoint; nothing actionable in Stack 2.0 DevSecOps
7. Cryptographic Practices: Done primarily on the backend; nothing actionable in Stack 2.0 DevSecOps
8. Error Handling and Logging: Done primarily on the backend; nothing actionable in Stack 2.0 DevSecOps
9. Data Protection:
    - Remove caches as soon as they're not needed. Do this by setting cache time appropriately in react-query.
    - Never store any sensitive info in clear text on the client side. Encryption on the client side is not ideal, so avoid sensitive info altogether.
10. Communication Security: Managed by SharePoint; nothing actionable in Stack 2.0 DevSecOps
11. System Configuration: Managed by SharePoint; nothing actionable in Stack 2.0 DevSecOps
12. Database Security: Primarily managed by SharePoint
    - Use parameterised queries. For REST API calls, validation is important.
13. File Management: See filtered checklist.
14. General Coding Practices:
    - Dependencies: Use `npm audit` and Snyk to scan
    - Code integrity: Use checksums to verify integrity of libraries

### OWASP Secure Coding Practices Checklist for Stack 2.0 DevSecOps
Incorporate the checklists below **during development**.

<details>
<summary>Input Validation</summary>

| Checklist Item | Remarks | Check |
| :------------- | :------ | ----- |
| Identify all data sources and classify them into trusted and untrusted. Validate all data from untrusted sources (e.g. Databases, file streams). | Trusted = SharePoint; non-trusted = any other source. Developer to implement input validation for user-uploaded data. | |
| There should be a centralized input validation routine for the application. | Developer to implement validator.js (strings only) for user-provided data. | |
| Specify proper character sets, such as UTF-8, for all sources of input. | Developer to include <meta charset="UTF-8"> in <head>. | |
| Encode data to a common character set before validating (Canonicalize). | Developer to implement UTF-8 encoding prior to validator.js validation. | |
| All validation failures should result in input rejection. | Developer to implement flashing of error messages upon input rejection. | |
| Determine if the system supports UTF-8 extended character sets and if so, validate after UTF-8 decoding is completed. | Similar to S/N 5. Developer to implement. | |
| Validate all client provided data before processing, including all parameters, URLs and HTTP header content (e.g. Cookie names and values). Be sure to include automated post backs from JavaScript, Flash or other embedded code. | URLs and HTTP headers are managed by SharePoint backend. Developer to implement check on user-provided data in parameters.  | |
| Validate for expected data types. | Developer to implement validation using validator.js | |
| Validate data range. | Developer to implement validation using validator.js IsInt and isFloat methods. | |
| Validate data length. | Developer to implement validation using validator.js isByteLength method. | |
| Validate all input against a "whitelist" of allowed characters, whenever possible. | Developer to implement validation using validator.js | |
| If any potentially hazardous characters must be allowed as input, be sure that you implement additional controls like output encoding, secure task specific APIs and accounting for the utilization of that data throughout the application . Examples of common hazardous characters include: < > " ' % ( ) & + \ \' \" . | Developer to implement validation using validator.js | |
| If your standard validation routine cannot address the following inputs, then they should be checked discretely. Check for (1) null bytes (%00), (2) new line characters (%0d, %0a, \r, \n), and (3) "dot-dot-slahs" path alterations characters. | Developer to implement validation using validator.js | |

</details>

<details>
<summary>Access Control</summary>

| Checklist Item | Remarks | Check |
| :------------- | :------ | ----- |
| Restrict access to files or other resources, including those outside the application's direct control, to only authorized users. | To be managed through SharePoint roles and permissions. Developer to implement. | |
| Restrict access to protected URLs to only authorized users. | To be managed through SharePoint roles and permissions IF app has specific routes meant for only some users. Developer to implement. | |
| Restrict access to protected functions to only authorized users. | To be managed through SharePoint roles and permissions IF app has specific functions meant for only some users. Developer to implement. | |
| *If state data must be stored on the client, use encryption and integrity checking on the server side to catch state tampering.* | *Cannot implement encryption securely on the client side. Challenging to implement encryption without being able to store keys in backend. Need to study further whether to encrypt state.* | |
| Enforce application logic flows to comply with business rules. | Map out user journeys. Developer to implement. | |
| Service accounts or accounts supporting connections to or from external systems should have the least privilege possible. | To be managed through SharePoint roles and permissions. Developer to implement. | |
| Create an Access Control Policy to document an application's business rules, data types and access authorization criteria and/or processes so that access can be properly provisioned and controlled. This includes identifying access requirements for both the data and system resources. | Developer to implement. | |

</details>

<details>
<summary>Data Protection</summary>

| Checklist Item | Remarks | Check |
| :------------- | :------ | ----- |
| Implement least privilege, restrict users to only the functionality, data and system information that is required to perform their tasks. | To be managed through SharePoint roles and permissions. Developer to implement. | |
| Remove unnecessary application and system documentation as this can reveal useful information to attackers. | Developer to ensure that GitHub repos are private. | |
| Do not include sensitive information in HTTP GET request parameters. | Developer to check. | |
| The application should support the removal of sensitive data when that data is no longer required. (e.g. personal information or certain financial data). | Developer / product manager to manage this manually via SharePoint. | |

</details>

<details>
<summary>System Configuration</summary>

| Checklist Item | Remarks | Check |
| :------------- | :------ | ----- |
| Prevent disclosure of your directory structure in the robots.txt file by placing directories not intended for public indexing into an isolated parent directory. Then "Disallow" that entire parent directory in the robots.txt file rather than Disallowing each individual directory. | Developer to ensure robots.txt is not uploaded. | |
| Isolate development environments from the production network and provide access only to authorized development and test groups. Development environments are often configured less securely than production environments and attackers may use this difference to discover shared weaknesses or as an avenue for exploitation. | Developer to manage access. For dev environment, GitHub. For production environment, use SharePoint permissions. | |
| Implement a software change control system to manage and record changes to the code both in development and production. | Developer to manage. For dev environment, use GitHub. For production environment, use DocLib versioning. | |

</details>

<details>
<summary>Database Security</summary>

| Checklist Item | Remarks | Check |
| :------------- | :------ | ----- |
| Use strongly typed parameterized queries. | Developer to implement validation. |
| Utilize input validation and output encoding and be sure to address meta characters. If these fail, do not run the database command. | Developer to implement. |
| The application should use the lowest possible level of privilege when accessing the database. | Developer to manage SharePoint roles and permissions. |

</details>

<details>
<summary>File Management</summary>

| Checklist Item | Remarks | Check |
| :------------- | :------ | ----- |
| Do not pass user supplied data directly to any dynamic include function. | Developer to comply. | |
| Limit the type of files that can be uploaded to only those types that are needed for business purposes. | Developer to implement checks based on business rules. | |
| Validate uploaded files are the expected type by checking file headers. Checking for file type by extension alone is not sufficient. | Developer to implement. | |
| Do not save files in the same web context as the application. Files should either go to the content server or in the database. | Developer to implement. | |
| Do not pass user supplied data into a dynamic redirect. If this must be allowed, then the redirect should accept only validated, relative path URLs. | Developer to comply. | |
| Ensure application files and resources are read-only. | Developers to set correct SharePoint permissions for app files. | |

</details>

<details>
<summary>Memory Management</summary>

| Checklist Item | Remarks | Check |
| :------------- | :------ | ----- |
| Utilize input and output control for un-trusted data. | Developer to implement. | |

</details>

<details>
<summary>General Coding Practices</summary>

| Checklist Item | Remarks | Check |
| :------------- | :------ | ----- |
| Use tested and approved managed code rather than creating new unmanaged code for common tasks. | Developer to use well-known, updated libraries. |
| Explicitly initialize all your variables and other data stores, either during declaration or just before the first usage. | Developer to implement. |
| In cases where the application must run with elevated privileges, raise privileges as late as possible, and drop them as soon as possible. | Developer to ensure that privileges are static. |
| Avoid calculation errors by understanding your programming language's underlying representation and how it interacts with numeric calculation. Pay close attention to byte size discrepancies, precision, signed/unsigned distinctions, truncation, conversion and casting between types, "not-a-number" calculations, and how your language handles numbers that are too large or too small for its underlying representation. | Developer to check. |
| Do not pass user supplied data to any dynamic execution function. | Developer to comply. |
| Restrict users from generating new code or altering existing code. | Developer to assign read-only permissions to app files. |
| Review all secondary applications, third party code and libraries to determine business necessity and validate safe functionality, as these can introduce new vulnerabilities. | Developer to scan repo with Snyk.io. |

</details>

### Sonar Static Code Analysis
Use the SonarLint extension in VS Code to audit code. It implements many [rules](https://rules.sonarsource.com/) for checking different languages.

### OWASP Web Security Testing Guide Checklist (KIV)
The `Status` column can be set for values similar to "Pass", "Fail", "N/A".

<details>
<summary>1. Information Gathering</summary>

- [ ] [Conduct Search Engine Discovery Reconnaissance for Information Leakage](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/01-Conduct_Search_Engine_Discovery_Reconnaissance_for_Information_Leakage.md)
- [ ] [Fingerprint Web Server](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server.md)
- [ ] [Review Webserver Metafiles for Information Leakage](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/03-Review_Webserver_Metafiles_for_Information_Leakage.md)
- [ ] [Enumerate Applications on Webserver](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/04-Enumerate_Applications_on_Webserver.md)
- [ ] [Review Webpage Content for Information Leakage](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/05-Review_Webpage_Content_for_Information_Leakage.md)
- [ ] [Identify application entry points](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/06-Identify_Application_Entry_Points.md)
- [ ] [Map execution paths through application](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/07-Map_Execution_Paths_Through_Application.md)
- [ ] [Fingerprint Web Application Framework](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/08-Fingerprint_Web_Application_Framework.md)
- [X] ~~Fingerprint Web Application~~
- [ ] [Map Application Architecture](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/01-Information_Gathering/10-Map_Application_Architecture.md)

</details>

<details>
<summary>2. Configuration and Deploy Management Testing</summary>

- [ ] [Test Network Infrastructure Configuration](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/01-Test_Network_Infrastructure_Configuration.md)
- [ ] [Test Application Platform Configuration](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/02-Test_Application_Platform_Configuration.md)
- [ ] [Test File Extensions Handling for Sensitive Information](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/03-Test_File_Extensions_Handling_for_Sensitive_Information.md)
- [ ] [Review Old Backup and Unreferenced Files for Sensitive Information](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/04-Review_Old_Backup_and_Unreferenced_Files_for_Sensitive_Information.md)
- [ ] [Enumerate Infrastructure and Application Admin Interfaces](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/05-Enumerate_Infrastructure_and_Application_Admin_Interfaces.md)
- [ ] [Test HTTP Methods](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/06-Test_HTTP_Methods.md)
- [ ] [Test HTTP Strict Transport Security](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/07-Test_HTTP_Strict_Transport_Security.md)
- [ ] [Test RIA cross domain policy](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/08-Test_RIA_Cross_Domain_Policy.md)
- [ ] [Test File Permission](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/09-Test_File_Permission.md)
- [ ] [Test for Subdomain Takeover](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/10-Test_for_Subdomain_Takeover.md)
- [ ] [Test Cloud Storage](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/11-Test_Cloud_Storage.md)

</details>

<details>
<summary>3. Identity Management Testing</summary>

- [ ] [Test Role Definitions](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/03-Identity_Management_Testing/01-Test_Role_Definitions.md)
- [ ] [Test User Registration Process](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/03-Identity_Management_Testing/02-Test_User_Registration_Process.md)
- [ ] [Test Account Provisioning Process](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/03-Identity_Management_Testing/03-Test_Account_Provisioning_Process.md)
- [ ] [Testing for Account Enumeration and Guessable User Account](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account.md)
- [ ] [Testing for Weak or unenforced username policy](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/03-Identity_Management_Testing/05-Testing_for_Weak_or_Unenforced_Username_Policy.md)

</details>

<details>
<summary>4. Authentication Testing</summary>

- [ ] [Testing for Credentials Transported over an Encrypted Channel](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/01-Testing_for_Credentials_Transported_over_an_Encrypted_Channel.md)
- [ ] [Testing for Default Credentials](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/02-Testing_for_Default_Credentials.md)
- [ ] [Testing for Weak Lock Out Mechanism](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/03-Testing_for_Weak_Lock_Out_Mechanism.md)
- [ ] [Testing for Bypassing Authentication Schema](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/04-Testing_for_Bypassing_Authentication_Schema.md)
- [ ] [Testing for Vulnerable Remember Password](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/05-Testing_for_Vulnerable_Remember_Password.md)
- [ ] [Testing for Browser Cache Weaknesses](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/06-Testing_for_Browser_Cache_Weaknesses.md)
- [ ] [Testing for Weak Password Policy](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/07-Testing_for_Weak_Password_Policy.md)
- [ ] [Testing for Weak Security Question Answer](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/08-Testing_for_Weak_Security_Question_Answer.md)
- [ ] [Testing for Weak Password Change or Reset Functionalities](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/09-Testing_for_Weak_Password_Change_or_Reset_Functionalities.md)
- [ ] [Testing for Weaker Authentication in Alternative Channel](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/04-Authentication_Testing/10-Testing_for_Weaker_Authentication_in_Alternative_Channel.md)

</details>

<details>
<summary>5. Authorisation Testing</summary>

- [ ] [Testing Directory Traversal File Include](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/05-Authorization_Testing/01-Testing_Directory_Traversal_File_Include.md)
- [ ] [Testing for Bypassing Authorization Schema](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/05-Authorization_Testing/02-Testing_for_Bypassing_Authorization_Schema.md)
- [ ] [Testing for Privilege Escalation](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/05-Authorization_Testing/03-Testing_for_Privilege_Escalation.md)
- [ ] [Testing for Insecure Direct Object References](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/05-Authorization_Testing/05-Testing_for_OAuth_Weaknesses.md)

</details>

<details>
<summary>6. Session Management Testing</summary>

- [ ] [Testing for Session Management Schema](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/01-Testing_for_Session_Management_Schema.md)
- [ ] [Testing for Cookies Attributes](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes.md)
- [ ] [Testing for Session Fixation](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/03-Testing_for_Session_Fixation.md)
- [ ] [Testing for Exposed Session Variables](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/04-Testing_for_Exposed_Session_Variables.md)
- [ ] [Testing for Cross Site Request Forgery](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/05-Testing_for_Cross_Site_Request_Forgery.md)
- [ ] [Testing for Logout Functionality](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/06-Testing_for_Logout_Functionality.md)
- [ ] [Testing Session Timeout](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/07-Testing_Session_Timeout.md)
- [ ] [Testing for Session Puzzling](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/08-Testing_for_Session_Puzzling.md)
- [ ] [Testing for Session Hijacking](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/09-Testing_for_Session_Hijacking.md)

</details>

<details>
<summary>7. Data Validation Testing</summary>

- [ ] [Testing for Reflected Cross Site Scripting](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting.md)
- [ ] [Testing for Stored Cross Site Scripting](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/02-Testing_for_Stored_Cross_Site_Scripting.md)
- [ ] [Testing for HTTP Verb Tampering](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/03-Testing_for_HTTP_Verb_Tampering.md)
- [ ] [Testing for HTTP Parameter Pollution](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/04-Testing_for_HTTP_Parameter_Pollution.md)
- [ ] [Testing for SQL Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05-Testing_for_SQL_Injection.md)
- [ ] [Testing for LDAP Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/06-Testing_for_LDAP_Injection.md)
- [ ] [Testing for XML Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/07-Testing_for_XML_Injection.md)
- [ ] [Testing for SSI Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/08-Testing_for_SSI_Injection.md)
- [ ] [Testing for XPath Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/09-Testing_for_XPath_Injection.md)
- [ ] [Testing for IMAP SMTP Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/10-Testing_for_IMAP_SMTP_Injection.md)
- [ ] [Testing for Code Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11-Testing_for_Code_Injection.md)
- [ ] [Testing for Command Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/12-Testing_for_Command_Injection.md)
- [ ] [Testing for Format String Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/13-Testing_for_Format_String_Injection.md)
- [ ] [Testing for Incubated Vulnerability](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/14-Testing_for_Incubated_Vulnerability.md)
- [ ] [Testing for HTTP Splitting Smuggling](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/15-Testing_for_HTTP_Splitting_Smuggling.md)
- [ ] [Testing for HTTP Incoming Requests](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/16-Testing_for_HTTP_Incoming_Requests.md)
- [ ] [Testing for Host Header Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/17-Testing_for_Host_Header_Injection.md)
- [ ] [Testing for Server-side Template Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/18-Testing_for_Server-side_Template_Injection.md)
- [ ] [Testing for Server-Side Request Forgery](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/19-Testing_for_Server-Side_Request_Forgery.md)

</details>

<details>
<summary>8. Error Handling</summary>

- [ ] [Testing for Improper Error Handling](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/08-Testing_for_Error_Handling/01-Testing_For_Improper_Error_Handling.md)
- [ ] [Testing for Stack Traces](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/08-Testing_for_Error_Handling/02-Testing_for_Stack_Traces.md)

</details>

<details>
<summary>9. Cryptography</summary>

- [ ] [Testing for Weak Transport Layer Security](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/01-Testing_for_Weak_Transport_Layer_Security.md)
- [ ] [Testing for Padding Oracle](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/02-Testing_for_Padding_Oracle.md)
- [ ] [Testing for Sensitive Information Sent via Unencrypted Channels](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/03-Testing_for_Sensitive_Information_Sent_via_Unencrypted_Channels.md)
- [ ] [Testing for Weak Encryption](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/04-Testing_for_Weak_Encryption.md)

</details>

<details>
<summary>10. Business logic Testing</summary>

- [ ] [Test Business Logic Data Validation](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/01-Test_Business_Logic_Data_Validation.md)
- [ ] [Test Ability to Forge Requests](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/02-Test_Ability_to_Forge_Requests.md)
- [ ] [Test Integrity Checks](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/03-Test_Integrity_Checks.md)
- [ ] [Test for Process Timing](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/04-Test_for_Process_Timing.md)
- [ ] [Test Number of Times a Function Can be Used Limits](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/05-Test_Number_of_Times_a_Function_Can_Be_Used_Limits.md)
- [ ] [Testing for the Circumvention of Work Flows](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/06-Testing_for_the_Circumvention_of_Work_Flows.md)
- [ ] [Test Defenses Against Application Mis-use](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/07-Test_Defenses_Against_Application_Misuse.md)
- [ ] [Test Upload of Unexpected File Types](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/08-Test_Upload_of_Unexpected_File_Types.md)
- [ ] [Test Upload of Malicious Files](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/10-Business_Logic_Testing/09-Test_Upload_of_Malicious_Files.md)

</details>

<details>
<summary>11. Client Side Testing</summary>

- [ ] [Testing for DOM-Based Cross Site Scripting](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/01-Testing_for_DOM-based_Cross_Site_Scripting.md)
- [ ] [Testing for JavaScript Execution](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/02-Testing_for_JavaScript_Execution.md)
- [ ] [Testing for HTML Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/03-Testing_for_HTML_Injection.md)
- [ ] [Testing for Client Side URL Redirect](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/04-Testing_for_Client-side_URL_Redirect.md)
- [ ] [Testing for CSS Injection](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/05-Testing_for_CSS_Injection.md)
- [ ] [Testing for Client Side Resource Manipulation](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/06-Testing_for_Client-side_Resource_Manipulation.md)
- [ ] [Test Cross Origin Resource Sharing](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing.md)
- [ ] [Testing for Cross Site Flashing](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/08-Testing_for_Cross_Site_Flashing.md)
- [ ] [Testing for Clickjacking](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/09-Testing_for_Clickjacking.md)
- [ ] [Testing WebSockets](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/10-Testing_WebSockets.md)
- [ ] [Test Web Messaging](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/11-Testing_Web_Messaging.md)
- [ ] [Testing Browser Storage](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/12-Testing_Browser_Storage.md)
- [ ] [Testing for Cross Site Script Inclusion](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/11-Client-side_Testing/13-Testing_for_Cross_Site_Script_Inclusion.md)

</details>

<details>
<summary>12. API Testing</summary>

- [ ] [Testing GraphQL](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/12-API_Testing/01-Testing_GraphQL.md)

</details>


## Limitations

### Secure but Limited Backend
Stack 2.0 development is primarily *frontend development*. All backend functionality is handled by SharePoint. This includes input validation, output validation, auth, session management, access control, and pretty much all categories in the security guidelines/checklists above. That greatly reduces the number of security checks we need to do, because SharePoint handles all of that.

However, we have little control over the SharePoint backend's features. More advanced SQL functionality like materialised views cannot be implemented. Additional services like NoSQL databases or ML are out of the question.

### Access Control is (Too) Strong
The double-edged feature of the SharePoint backend is **authentication and authorisation**. SharePoint is good at access control. It leverages the existing IAM system to determine whether users can access, or even *see* a resource. When a user accesses a Stack 2.0 app, they can only access the features of the app that uses resources SharePoint gives them access to. That greatly simplifies our responsibilities to manage authentication and authorisation.

On the other hand, the downside is that it greatly limits the capabilities of the apps we build. Specifically, Stack 2.0 apps cannot provide any features that require data that each individual user cannot access. Put positively, the apps can *only* provide features supported by 
data that **all users** can see.

For example, suppose a developer wants to include a feature that aggregates activity across all users and presents that aggregate in every user's dashboard, even those who have not contributed data. The feature is straightforward if *everyone* has access to *everyone else's* data. However, if the List that stores the data only allows users to see their own entries, **this feature will require a workaround**. The app must rely on admin users with access to everyone's data to process it and store it in a separate List that the app will then query data from.

Therefore, we must configure SharePoint permissions for access control with the following principles:

1. **Stack 2.0 apps will only process non-sensitive data.** Any data processed in React is on the client side, which can be accessed through developer tools (where enabled). Knowing this, we will not process any sensitive data. Besides, sensitive data should not be stored in a shared drive anyway.
2. **Users must only be given access to data they are allowed to see.** This is enforced through the assignment of SharePoint permissions. Possible approaches:
    1. Use item-level permissions for groups - manually set
    2. Use separate Lists for different user groups

Possible approaches for aggregation:

1. **Blockchain approach:** If there are enough admin users with access to all the data, data aggregation occurs whenever an admin user uses the app. The aggregated data is then stored in a separate List that all users query.
2. **MapReduce approach:** If there are clearly-defined, mutually exclusive groups, whenever *any* user from each group uses the app, he/she aggregates data for that group in the List for aggregated data. All users then perform the final aggregation using the aggregates for the mutually exclusive groups.