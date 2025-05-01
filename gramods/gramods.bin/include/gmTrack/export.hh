
#ifndef gmTrack_API_H
#define gmTrack_API_H

#ifdef GMTRACK_STATIC_DEFINE
#  define gmTrack_API
#  define GMTRACK_NO_EXPORT
#else
#  ifndef gmTrack_API
#    ifdef gmTrack_EXPORTS
        /* We are building this library */
#      define gmTrack_API __declspec(dllexport)
#    else
        /* We are using this library */
#      define gmTrack_API __declspec(dllimport)
#    endif
#  endif

#  ifndef GMTRACK_NO_EXPORT
#    define GMTRACK_NO_EXPORT 
#  endif
#endif

#ifndef GMTRACK_DEPRECATED
#  define GMTRACK_DEPRECATED __declspec(deprecated)
#endif

#ifndef GMTRACK_DEPRECATED_EXPORT
#  define GMTRACK_DEPRECATED_EXPORT gmTrack_API GMTRACK_DEPRECATED
#endif

#ifndef GMTRACK_DEPRECATED_NO_EXPORT
#  define GMTRACK_DEPRECATED_NO_EXPORT GMTRACK_NO_EXPORT GMTRACK_DEPRECATED
#endif

/* NOLINTNEXTLINE(readability-avoid-unconditional-preprocessor-if) */
#if 0 /* DEFINE_NO_DEPRECATED */
#  ifndef GMTRACK_NO_DEPRECATED
#    define GMTRACK_NO_DEPRECATED
#  endif
#endif

#endif /* gmTrack_API_H */
