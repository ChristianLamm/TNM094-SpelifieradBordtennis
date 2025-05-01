
#ifndef gmCore_API_H
#define gmCore_API_H

#ifdef GMCORE_STATIC_DEFINE
#  define gmCore_API
#  define GMCORE_NO_EXPORT
#else
#  ifndef gmCore_API
#    ifdef gmCore_EXPORTS
        /* We are building this library */
#      define gmCore_API __declspec(dllexport)
#    else
        /* We are using this library */
#      define gmCore_API __declspec(dllimport)
#    endif
#  endif

#  ifndef GMCORE_NO_EXPORT
#    define GMCORE_NO_EXPORT 
#  endif
#endif

#ifndef GMCORE_DEPRECATED
#  define GMCORE_DEPRECATED __declspec(deprecated)
#endif

#ifndef GMCORE_DEPRECATED_EXPORT
#  define GMCORE_DEPRECATED_EXPORT gmCore_API GMCORE_DEPRECATED
#endif

#ifndef GMCORE_DEPRECATED_NO_EXPORT
#  define GMCORE_DEPRECATED_NO_EXPORT GMCORE_NO_EXPORT GMCORE_DEPRECATED
#endif

/* NOLINTNEXTLINE(readability-avoid-unconditional-preprocessor-if) */
#if 0 /* DEFINE_NO_DEPRECATED */
#  ifndef GMCORE_NO_DEPRECATED
#    define GMCORE_NO_DEPRECATED
#  endif
#endif

#endif /* gmCore_API_H */
