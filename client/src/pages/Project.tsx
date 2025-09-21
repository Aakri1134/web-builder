import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getDSL } from "../utils/DSL/getDSL"
import type { Project } from "../types/Project"
import PageHandler from "../components/PageHandler"
import GlobalEditor from "../components/Edit/GlobalEditor"
export default function Edit() {
  //@ts-ignore
  const { id } = useParams()

  const [project, setProject] = useState<Project>()


  useEffect(() => {
    async function fetchProject() {
      // add logic later

      const res = getDSL("")
      if (!res) {
        console.log("Sanetizer failed")
      } else {
        setProject({
          id: "jfdnfijbofanisasklnlsn",
          name: "Demo 1",
          pages: [
            {
              id: "jfdkjsj",
              name: "home",
              page: res,
            },
          ],
        })
      }
    }
    fetchProject()
  })

  if (!project) return null

  return (
    <>
      <div
        style={{
          margin: 0,
        }}
        className="light flex justify-center items-center"
      >
        <PageHandler pages={project?.pages} />
        <GlobalEditor/>
      </div>
    </>
  )
}
