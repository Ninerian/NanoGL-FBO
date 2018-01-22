attribute vec2 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main( void ){
  float ratio = aPosition.x / aPosition.y;
  gl_Position = vec4( aPosition, 0.5, 1.0 );
  vTexCoord = aTexCoord;
}