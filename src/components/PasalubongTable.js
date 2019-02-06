import React from 'react'
import {
  Table,
  TableCell,
  TableHead,
  TableRow,  
  TableBody, 
  Paper,
} from '@material-ui/core'

const PasalubongTable = ({
  tableCell,
  children
}) => { 
    return(
      <React.Fragment>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                { tableCell.map((cell, i) => <TableCell key={i}> { cell } </TableCell>) }
              </TableRow>
            </TableHead>
            <TableBody className='text-center'>
              { children }
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    )
}

export default PasalubongTable