#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "gmGraphics" for configuration "Release"
set_property(TARGET gmGraphics APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(gmGraphics PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/gmGraphics.lib"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/gmGraphics.dll"
  )

list(APPEND _cmake_import_check_targets gmGraphics )
list(APPEND _cmake_import_check_files_for_gmGraphics "${_IMPORT_PREFIX}/lib/gmGraphics.lib" "${_IMPORT_PREFIX}/bin/gmGraphics.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
