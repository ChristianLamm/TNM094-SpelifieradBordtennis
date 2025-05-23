
#ifndef GRAMODS_CORE_CONFIG
#define GRAMODS_CORE_CONFIG

#define BEGIN_NAMESPACE_GRAMODS namespace gramods {//
#define END_NAMESPACE_GRAMODS }//
#define USING_NAMESPACE_GRAMODS using namespace gramods;//

#define BEGIN_NAMESPACE_GMCORE namespace gramods { namespace gmCore {//
#define END_NAMESPACE_GMCORE }}//
#define USING_NAMESPACE_GMCORE using namespace gramods::gmCore;//

/**
   Gramods, short for Graphics Modules, is a collection of weakly
   inter dependent and useful APIs for Virtual Reality and graphics
   cluster rendering.

   The main purpose of the Gramods library is to simplify loading of
   platform dependent configurations into a pre-compiled application,
   while also simplifying the implementation of such applications. The
   aim is to be able to implement an application that employs
   execution and data synchronization over network and synchronized
   multi window rendering in a flexible and configurable way.
 */
namespace gramods {

  /**
     The gmCore module specifies utilities for loading other modules and
     configure them based on configuration files, for handling library
     and application error, warning and debugging output, and possibly
     also for initialization of third party libraries that may be used
     by other modules.
  */
  namespace gmCore {}
}

/* #undef gramods_STRIP_PATH_FROM_FILE */

#define HAVE_Eigen3
#ifdef HAVE_Eigen3
#define gramods_ENABLE_Eigen3
#endif

#define TinyXML2_FOUND
#ifdef TinyXML2_FOUND
#define gramods_ENABLE_TinyXML2
#endif

#define HAVE_FreeImage
#ifdef HAVE_FreeImage
#define gramods_ENABLE_FreeImage
#endif

#define SDL2_FOUND
#ifdef SDL2_FOUND
#define gramods_ENABLE_SDL2
#endif

/* #undef OpenVR_FOUND */
#ifdef OpenVR_FOUND
/* #undef gramods_ENABLE_OpenVR */
#endif

#endif
