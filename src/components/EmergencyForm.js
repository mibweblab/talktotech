// // import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// // export default class EmergencyForm extends React.Component {
// //   state = {
// //     open: false
// //   };

// //   handleClickOpen = () => {
// //     this.setState({ open: true });
// //   };

// //   handleClose = () => {
// //     this.setState({ open: false });
// //   };

// //   render() {
// //     return (
// //       <div>
// //         <Button
// //           variant="outlined"
// //           color="primary"
// //           onClick={this.handleClickOpen}
// //         >
// //           Open form dialog
// //         </Button>
// //         <Dialog
// //           open={this.state.open}
// //           onClose={this.handleClose}
// //           aria-labelledby="form-dialog-title"
// //         >
// //           <DialogTitle id="form-dialog-title">Emergency Contact</DialogTitle>
// //           <DialogContent>
// //             <DialogContentText>
// //               Please provide the name and phone number of someone in case of
// //               emergency
// //             </DialogContentText>
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               id="name"
// //               label="Name"
// //               type="name"
// //               fullWidth
// //             />
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               id="name"
// //               label="Phone Number"
// //               type="number"
// //               fullWidth
// //             />
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={this.handleClose} color="primary">
// //               Cancel
// //             </Button>
// //             <Button onClick={this.handleClose} color="primary">
// //               Save
// //             </Button>
// //           </DialogActions>
// //         </Dialog>
// //       </div>
// //     );
// //   }
// // }

// import React, { Component } from 'react';

// export default class EmergencyForm extends Component {
//   render() {
//     return (
//       <div className="row">
//         <form className="col s12">
//           <div className="input-field col s6">
//             <i className="material-icons prefix">account_circle</i>
//             <input id="icon_prefix" type="text" className="validate" />
//             <label for="icon_prefix">Name</label>
//           </div>
//           <div className="input-field col s6">
//             <i className="material-icons prefix">account_circle</i>
//             <input id="icon_prefix" type="text" className="validate" />
//             <label for="icon_prefix">Relationship</label>
//           </div>
//           <div className="input-field col s6">
//             <i className="material-icons prefix">phone</i>
//             <input id="icon_telephone" type="text" className="validate" />
//             <label for="icon_telephone">Name</label>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
