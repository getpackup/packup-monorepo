import { FunctionComponent } from 'react'

type PackingListLabelCreateProps = {
  toggleListHandler: (e: any) => void
}

export const PackingListLabelCreate: FunctionComponent<PackingListLabelCreateProps> = ({
  toggleListHandler
}) => {
  return (
    <>
      <p>Lets create new label</p>
    </>
  )
}
