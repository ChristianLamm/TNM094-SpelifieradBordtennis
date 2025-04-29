#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "gmCore" for configuration "Release"
set_property(TARGET gmCore APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(gmCore PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/gmCore.lib"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/gmCore.dll"
  )

list(APPEND _cmake_import_check_targets gmCore )
list(APPEND _cmake_import_check_files_for_gmCore "${_IMPORT_PREFIX}/lib/gmCore.lib" "${_IMPORT_PREFIX}/bin/gmCore.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
