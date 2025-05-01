
#ifndef GRAMODS_TRACK_CONFIG
#define GRAMODS_TRACK_CONFIG

#define BEGIN_NAMESPACE_GMTRACK namespace gramods { namespace gmTrack {//
#define END_NAMESPACE_GMTRACK }}//
#define USING_NAMESPACE_GMTRACK using namespace gramods::gmTrack

namespace gramods {

  /**
     The gmTrack module provides primarily pose tracking clients,
     servers and filters.
  */
  namespace gmTrack {}
}

#include <gmCore/config.hh>

/* #undef HAVE_VRPN */
#ifdef HAVE_VRPN
/* #undef gramods_ENABLE_VRPN */
#endif

/* #undef HAVE_OpenCV */
#ifdef HAVE_OpenCV
/* #undef gramods_ENABLE_OpenCV */
#endif

/* #undef HAVE_OpenCV_objdetect */
#ifdef HAVE_OpenCV_objdetect
/* #undef gramods_ENABLE_OpenCV_objdetect */
#endif

#endif
