
#ifndef GRAMODS_GRAPHICS_CONFIG
#define GRAMODS_GRAPHICS_CONFIG

#define BEGIN_NAMESPACE_GMGRAPHICS namespace gramods { namespace gmGraphics {//
#define END_NAMESPACE_GMGRAPHICS }}//
#define USING_NAMESPACE_GMGRAPHICS using namespace gramods::gmGraphics;//

namespace gramods {

  /**
     The gmGraphics module provides nodes primarily for graphics
     rendering pipeline definition and handling.

     A Window creates a graphics context and makes it current before
     any subsequent calls. The Window calls a View to produce
     graphics. A View may call other views recursively, or make one or
     more calls to one or more renderers to produce this graphics. It
     is the renderer that actually renders the scene, while the view
     determines frame buffers and frustum settings to use, based on
     the current Viewpoint.
  */
  namespace gmGraphics {}
}


#include <gmTrack/config.hh>


/* #undef HAVE_SDL2 */
#ifdef HAVE_SDL2
#define gramods_ENABLE_SDL2
#endif

/* #undef HAVE_libuvc */
#ifdef HAVE_libuvc
/* #undef gramods_ENABLE_libuvc */
#ifdef gramods_ENABLE_libuvc
/* #undef gramods_ENABLE_libuvc_007 */
#endif
#endif

#define HAVE_tinyobjloader
#ifdef HAVE_tinyobjloader
#define gramods_ENABLE_tinyobjloader
/* #undef TINYOBJLOADER_USE_MAPBOX_EARCUT */
#endif

/* #undef HAVE_OpenSceneGraph */
#ifdef HAVE_OpenSceneGraph
/* #undef gramods_ENABLE_OpenSceneGraph */
#endif


#endif
