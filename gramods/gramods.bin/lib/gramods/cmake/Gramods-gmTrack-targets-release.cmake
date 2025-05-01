#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "gmTrack" for configuration "Release"
set_property(TARGET gmTrack APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(gmTrack PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/gmTrack.lib"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/gmTrack.dll"
  )

list(APPEND _cmake_import_check_targets gmTrack )
list(APPEND _cmake_import_check_files_for_gmTrack "${_IMPORT_PREFIX}/lib/gmTrack.lib" "${_IMPORT_PREFIX}/bin/gmTrack.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
