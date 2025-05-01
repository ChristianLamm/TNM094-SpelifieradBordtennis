#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "gmMisc" for configuration "Release"
set_property(TARGET gmMisc APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(gmMisc PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/gmMisc.lib"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/gmMisc.dll"
  )

list(APPEND _cmake_import_check_targets gmMisc )
list(APPEND _cmake_import_check_files_for_gmMisc "${_IMPORT_PREFIX}/lib/gmMisc.lib" "${_IMPORT_PREFIX}/bin/gmMisc.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
