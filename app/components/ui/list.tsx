type ListProps = {
  paragraphs: string[]
  ordered?: boolean
}

export function List({ paragraphs, ordered = false }: ListProps) {
  if (ordered) {
    return (
      <ol className='list-decimal pl-4 space-y-2'>
        {paragraphs.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>
    )
  }

  return (
    <ul className='list-disc pl-4 space-y-2'>
      {paragraphs.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  )
}
