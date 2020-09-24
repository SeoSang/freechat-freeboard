import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import { useStore } from "../stores"
import { observer } from "mobx-react"
import moment from "moment"
import { PageLink } from "../components/PageLink"
import { useRouter } from "next/dist/client/router"
import { Button } from "@material-ui/core"
import { FlexDiv } from "../styles/div"
import theme from "../styles/theme"

interface Column {
  id: "master" | "title" | "userCount" | "createdAt"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: Date | string | number) => string
}

const columns: Column[] = [
  { id: "master", label: "방장", minWidth: 50 },
  { id: "title", label: "제목", minWidth: 200 },
  {
    id: "userCount",
    label: "참여자 수",
    minWidth: 50,
  },
  {
    id: "createdAt",
    label: "생성일",
    minWidth: 50,
    format: (date) => moment(date).format("lll"),
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(1, 0),
  },
}))

function room() {
  const st = useStyles()
  const router = useRouter()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { chatStore } = useStore()
  const [rooms, setRooms] = useState<typeof chatStore.rooms | null>()

  useEffect(() => {
    const getRooms = async () => {
      await chatStore.getRooms()
      setRooms(chatStore.rooms)
    }
    const timer = setTimeout(getRooms, 200)
    return () => {
      clearTimeout(timer)
    }
  }, [chatStore])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const onClickRow = (id: number) => () => {
    router.push({ pathname: `/room`, query: { id: id.toString() } })
  }

  return (
    <FlexDiv direction='column'>
      <Paper className={st.root}>
        <TableContainer className={st.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.id}
                      onClick={onClickRow(row.id)}>
                      {columns.map((column) => {
                        const value = column.format
                          ? column.format(row[column.id])
                          : row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rooms ? rooms.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <div className={st.buttonContainer}>
        <Button color='primary' variant='contained'>
          생성하기
        </Button>
      </div>
    </FlexDiv>
  )
}

export default observer(room)
