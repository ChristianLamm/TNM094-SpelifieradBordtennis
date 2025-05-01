// CMakeProject1.cpp : Defines the entry point for the application.
#include <boost/asio.hpp>                 
#include <boost/asio/ip/tcp.hpp>          
#include <boost/asio/write.hpp>           
#include <boost/asio/connect.hpp>         
#include <iostream>
#include <memory>
#include <string>
#include <thread>
#include <chrono>
#include <random>

//
struct Impl {
    //Boost.Asio för att hantera alla I/O-operationer
    boost::asio::io_context io_context;

    //Smartpekare till en TCP - socket som hanterar anslutningen till servern
    std::unique_ptr<boost::asio::ip::tcp::socket> socket;

    //skapar anslutning mellan host och port
    Impl(const std::string& host, int port) {

        //Skapar en resolver för att översätta host + port till en lista av endpoints
        boost::asio::ip::tcp::resolver resolver(io_context);

        //DNS anslutning, IP-adress + port
        auto endpoints = resolver.resolve(host, std::to_string(port));

        //Allokerar och kopplar till endpoint
        socket = std::make_unique<boost::asio::ip::tcp::socket>(io_context);
        boost::asio::connect(*socket, endpoints);
    }

    //Skickar meddelande till servern via socket
    void send(const std::string& message) {
        //skriver meddelandet
        boost::asio::write(*socket, boost::asio::buffer(message + "\n"));
        //loggar meddelandet
        std::cout << "Sent: " << message << std::endl;
    }
};

//adress och portnummer till TCP anslutning
int main() {
    Impl impl("127.0.0.1", 12345);

    //get some random numbers
    std::random_device rd;
    std::mt19937 gen(rd());

    // Define distributions
    std::uniform_int_distribution<> dist1(0, 652);
    std::uniform_int_distribution<> dist2(0, 593);

    int random1 = 0;
	int random2 = 0;
    //Tillfällig loop, ska bytas ut
    int count = 0;
    while (true) {
		//generate 2 random numbers
        random1 = dist1(gen);
        random2 = dist2(gen);

        impl.send(std::to_string(random1) + "," + std::to_string(random2));
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    

}


