#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "gmSound" for configuration "Release"
set_property(TARGET gmSound APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(gmSound PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/gmSound.lib"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/gmSound.dll"
  )

list(APPEND _cmake_import_check_targets gmSound )
list(APPEND _cmake_import_check_files_for_gmSound "${_IMPORT_PREFIX}/lib/gmSound.lib" "${_IMPORT_PREFIX}/bin/gmSound.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
