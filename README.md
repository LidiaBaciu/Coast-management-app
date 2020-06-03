# Coast-management-app
 
This project focuses on gathering and illustrating information about the quality of the water nerby the coasts of Norway. 

## Setup
1. Clone this repository. <br>
2. Create the database in MySQL using: create database [YOUR DATABASE NAME HERE] <br>
3. Change in *application.properties* the following lines of code: <br>
spring.datasource.url= jdbc:mysql://localhost:3306/[YOUR DATABASE NAME HERE]?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false <br>
spring.datasource.username= [YOUR USERNAME HERE]<br>
spring.datasource.password= [YOUR PASSWORD HERE]<br>