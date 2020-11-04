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
import { useRouter } from "next/dist/client/router"
import { Typography } from "@material-ui/core"
import clsx from "clsx"
import { useMarginStyles, useTypicalStyles } from "../styles/cssStyles"
import { FlexDiv } from "../styles/div"

interface Column {
  id: "id" | "title" | "commentCount" | "createdAt"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: Date | string | number) => string
}

const columns: Column[] = [
  { id: "id", label: "순번", minWidth: 50 },
  { id: "title", label: "제목", minWidth: 200 },
  {
    id: "commentCount",
    label: "댓글 수",
    minWidth: 50,
  },
  {
    id: "createdAt",
    label: "작성일자",
    minWidth: 50,
    format: (date) => moment(date).format("lll"),
  },
]

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
})

function StickyHeadTable() {
  const router = useRouter()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { postStore } = useStore()
  const [posts, setPosts] = useState<typeof postStore.posts | null>()

  const classes = useStyles()
  const typ = useTypicalStyles()
  const mar = useMarginStyles()

  useEffect(() => {
    const getPost = async () => {
      await postStore.getPosts()
      setPosts(postStore.posts)
    }
    const timer = setTimeout(getPost, 200)
    return () => {
      clearTimeout(timer)
    }
  }, [postStore])

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
    router.push({ pathname: `/post`, query: { id: id.toString() } })
  }

  return (
    <FlexDiv direction='column'>
      <Typography className={clsx(typ.bold, mar.marBottom2)} variant='h4'>
        자유게시판
      </Typography>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
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
              {posts
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
          count={posts ? posts.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </FlexDiv>
  )
}

export default observer(StickyHeadTable)
