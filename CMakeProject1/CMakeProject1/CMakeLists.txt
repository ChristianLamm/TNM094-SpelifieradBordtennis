cmake_minimum_required(VERSION 3.20)

project(CMakeProject1 LANGUAGES CXX)

# Find Boost
find_package(Boost REQUIRED)

# Add source to this project's executable
add_executable(CMakeProject1 "CMakeProject1.cpp" "CMakeProject1.h")

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET CMakeProject1 PROPERTY CXX_STANDARD 20)
endif()

# Include Boost headers
target_include_directories(CMakeProject1 PRIVATE ${Boost_INCLUDE_DIRS})

# Link Boost libraries (if needed)
target_link_libraries(CMakeProject1 PRIVATE ${Boost_LIBRARIES})

# TODO: Add tests and install targets if needed.