#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "gmTouch" for configuration "Release"
set_property(TARGET gmTouch APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(gmTouch PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/gmTouch.lib"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/gmTouch.dll"
  )

list(APPEND _cmake_import_check_targets gmTouch )
list(APPEND _cmake_import_check_files_for_gmTouch "${_IMPORT_PREFIX}/lib/gmTouch.lib" "${_IMPORT_PREFIX}/bin/gmTouch.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
