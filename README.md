# Coast-management-app
 
## About
This project focuses on gathering and illustrating information about the quality of the water nerby the coasts of Norway. 

The project's idea starts with the fact that some technologies could be used to inform the users about the quality of the water around areas used for swimming or fishing. 
The application could be used to observe also the unusual events that happen around certain areas.

The hardware part would focus on a little device called buoy, which contains temperature and pH sensors and sends the information collected to a server, respectively to a MySQL database.
The app is a full stack application which will communicate with the server using a RESTful web service. It was developed using ReactJS (for the user interface) and SpringBoot (with Java for the server side).
The user interface is divided into two parts, taking into consideration the role of the user logged in. Therefore, there is the logged in user interface, which provides the following functionalities: detailed information about the water quality around certain areas, allowing the user to report a problem to the admins. The admin can view the reported problems, change the status (solved/unsolved) of a specific problem, add beaches or buoys and also visualize details of the other admins.

### Setup
1. Clone this repository. <br>
2. Create the database in MySQL using: create database [YOUR DATABASE NAME HERE] <br>
3. Change in *application.properties* the following lines of code: <br>
spring.datasource.url= jdbc:mysql://localhost:3306/[YOUR DATABASE NAME HERE]?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false <br>
spring.datasource.username= [YOUR USERNAME HERE]<br>
spring.datasource.password= [YOUR PASSWORD HERE]<br>