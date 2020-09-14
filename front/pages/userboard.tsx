import React from "react"
import MaterialTable, { Column } from "material-table"
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core"
import { PageLink } from "../components/PageLink"

interface Row {
  nickname: string
  title: string
  day: string
  like: number
  views: number
}

interface TableState {
  columns: Array<Column<Row>>
  data: Row[]
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {},
    lowerPartContainer: {
      display: "flex",
      margin: theme.spacing(1),
      alignItems: "center",
      justifyContent: "center",
    },
  })
)

export default function MaterialTableDemo() {
  const classes = useStyle()
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: "작성자", field: "nickname", width: 50 },
      { title: "글 제목", field: "title" },
      { title: "작성일", field: "day" },
      { title: "좋아요", field: "like", type: "numeric" },
      {
        title: "조회수",
        field: "views",
        type: "numeric",
      },
    ],
    data: [
      { nickname: "Mehmet", title: "제목", day: "1987", like: 63, views: 100 },
    ],
  })

  return (
    <div>
      <MaterialTable
        title='자유게시판'
        columns={state.columns}
        data={state.data}
        options={{
          rowStyle: {
            backgroundColor: "#EEE",
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
                setState((prevState) => {
                  const data = [...prevState.data]
                  data.push(newData)
                  return { ...prevState, data }
                })
              }, 600)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data]
                    data[data.indexOf(oldData)] = newData
                    return { ...prevState, data }
                  })
                }
              }, 600)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
                setState((prevState) => {
                  const data = [...prevState.data]
                  data.splice(data.indexOf(oldData), 1)
                  return { ...prevState, data }
                })
              }, 600)
            }),
        }}
      />
      <div className={classes.lowerPartContainer}>
        <PageLink href='/addpost'>
          <Button variant='contained' color='primary'>
            새 포스트 작성
          </Button>
        </PageLink>
      </div>
    </div>
  )
}
