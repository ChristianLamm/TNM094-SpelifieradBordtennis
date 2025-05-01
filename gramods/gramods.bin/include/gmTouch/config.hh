
#ifndef GRAMODS_TOUCH_CONFIG
#define GRAMODS_TOUCH_CONFIG

#define BEGIN_NAMESPACE_GMTOUCH namespace gramods { namespace gmTouch {//
#define END_NAMESPACE_GMTOUCH }}//
#define USING_NAMESPACE_GMTOUCH using namespace gramods::gmTouch

namespace gramods {

  /**
     The module provides touch handling functionality for the
     implementation of touch screen or touch table interaction.
  */
  namespace gmTouch {}
}


#include <gmMisc/config.hh>


/* #undef HAVE_OpenSceneGraph */
#ifdef HAVE_OpenSceneGraph
/* #undef gramods_ENABLE_OpenSceneGraph */
#endif

/* #undef HAVE_TUIO */
#ifdef HAVE_TUIO
/* #undef gramods_ENABLE_TUIO */
#endif

/* #undef HAVE_SDL2 */
#ifdef HAVE_SDL2
#define gramods_ENABLE_SDL2
#endif

#endif
