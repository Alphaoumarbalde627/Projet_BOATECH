type LoadErrorProps = {
  message: string
}

function LoadError({ message }: LoadErrorProps) {
  return (
    <p className="load-error" role="alert">
      Le contenu n’a pas pu être chargé : {message}
    </p>
  )
}

export default LoadError
