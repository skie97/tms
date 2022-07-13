# Stack 2.0 App
This is a template repository for a Stack 2.0 app. Rename the title above to your project name.

## Introduction
Introduce your project here. Guiding questions:

1. Who are your end users?
2. What is the current business problem?
3. What is your solution (in a nutshell)?
4. What is the value proposition for your solution?

## Data
1. Briefly outline the data for the app.
2. Map out the Entity-Relationship Diagram (ERD). A sample is provided below:

```mermaid
erDiagram
  TABLE1 ||--|{ TABLE2 : has
  TABLE1 ||--|{ TABLE3 : has
  TABLE1 {
    int Id PK "Default SharePoint autonumber PK"
    string Title "Default SharePoint title"
    string Column1 "Column 1"
    float Column2 "Column 2"
    bool Column3 "Column 3"
    datetime Column4 "Column 4"
  }
  TABLE2 {
    int Id PK "Default SharePoint autonumber PK"
    string Title "Default SharePoint title"
    string ColumnA "Column A"
    int ColumnB "Column B"
    string ColumnC "Column C"
    float ColumnD "Column D"
  }
  TABLE3 {
    int Id PK "Default SharePoint autonumber PK"
    string Title "Default SharePoint title"
    string ColumnI "Column I"
    bool ColumnII "Column II"
    int ColumnIII "Column III"
    string ColumnIV "Column IV"
  }
```

