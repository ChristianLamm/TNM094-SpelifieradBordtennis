#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "gmNetwork" for configuration "Release"
set_property(TARGET gmNetwork APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(gmNetwork PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/gmNetwork.lib"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/gmNetwork.dll"
  )

list(APPEND _cmake_import_check_targets gmNetwork )
list(APPEND _cmake_import_check_files_for_gmNetwork "${_IMPORT_PREFIX}/lib/gmNetwork.lib" "${_IMPORT_PREFIX}/bin/gmNetwork.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
