
#ifndef GRAMODS_GRAPHICS_TEXTUREINTERFACE
#define GRAMODS_GRAPHICS_TEXTUREINTERFACE

#include <gmGraphics/config.hh>

#include <gmGraphics/Eye.hh>

#include <GL/glew.h>
#include <GL/gl.h>

BEGIN_NAMESPACE_GMGRAPHICS;

/**
   The interface for classes providing texture data for rendering.
*/
class TextureInterface {

public:

  /**
     Updates the texture and returns the ID of the associated GL
     texture object. Must be called with GL context. Observe also that
     this method may perform off-screen rendering.

     @param frame_number The current frame being rendered. This number
     should increment by one for each frame, however it may wrap
     around and start over at zero.

     @param eye Eye for which the texture is requested. An
     implementation may use different textures for different eyes or
     may reuse the same texture for all eyes.

     @returns OpenGL texture ID of the updated texture
  */
  virtual GLuint updateTexture(size_t frame_number, Eye eye) = 0;

};

END_NAMESPACE_GMGRAPHICS;

#endif
