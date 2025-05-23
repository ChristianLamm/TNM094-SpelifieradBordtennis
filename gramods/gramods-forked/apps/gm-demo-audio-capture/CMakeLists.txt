CMAKE_MINIMUM_REQUIRED(VERSION 3.10)
CMAKE_POLICY(VERSION 3.10)


SET (APP_INCLUDE_DIRS CACHE INTERNAL "The list of include folders to search for the app.")
SET (APP_LIBS CACHE INTERNAL "The list of libraries that the app should link against.")

LIST (APPEND APP_INCLUDE_DIRS ${CMAKE_CURRENT_SOURCE_DIR}/include)
LIST (APPEND APP_INCLUDE_DIRS ${CMAKE_CURRENT_BINARY_DIR}/include)

IF (NOT TARGET gmSound)
  MESSAGE (WARNING "Not including gm-demo-audio-capture - requires gmSound")
  RETURN()
ENDIF ()
LIST (APPEND APP_LIBS gmSound_internal_deps)

FIND_PACKAGE (TCLAP)
IF (NOT TCLAP_FOUND)
  MESSAGE (STATUS "Not including gm-demo-audio-capture - requires TCLAP")
  RETURN()
ENDIF ()
LIST (APPEND APP_INCLUDE_DIRS ${TCLAP_INCLUDE_DIRS})

ADD_EXECUTABLE(gm-demo-audio-capture src/main.cpp)

TARGET_INCLUDE_DIRECTORIES(gm-demo-audio-capture PUBLIC ${APP_INCLUDE_DIRS})
TARGET_LINK_LIBRARIES(gm-demo-audio-capture ${APP_LIBS})

SET_PROPERTY(TARGET gm-demo-audio-capture PROPERTY CXX_STANDARD 17)
SET_PROPERTY(TARGET gm-demo-audio-capture PROPERTY DEBUG_POSTFIX ${CMAKE_DEBUG_POSTFIX})


INSTALL(TARGETS gm-demo-audio-capture
  LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
  RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR})

LIST(APPEND gramods_EXEC_TARGET_FILES "$<TARGET_FILE:gm-demo-audio-capture>")
SET(gramods_EXEC_TARGET_FILES ${gramods_EXEC_TARGET_FILES} PARENT_SCOPE)
