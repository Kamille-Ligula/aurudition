export function KeyIMG(color, width, height) {
  const borderWidth = 0.1;

  return (
    <div
      className="noteimg"
      alt={''}
      style={{
        backgroundColor: color,
        width: (width-borderWidth*2)+'vw',
        height: height+'px',
        borderStyle: 'solid',
        borderWidth: borderWidth+'vw',
        borderColor: '#000000',
      }}
    />
  )
}
