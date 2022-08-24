import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {useState} from 'react';
import { createClient,getClients } from "../../services/api";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

export default function ClientSearchAndInsert(clickSearch:any) {
    const [open, setOpen] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const [state, setState] = useState({
        id:new Date().getTime().toString(),
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:""
    });
    const [searchKeywordState, setSearchState]=useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const insertClient=()=>{
        setSubmit(true);
        if(state.firstName!=="" && state.lastName!=="" && state.email!=="" && state.phoneNumber!=="")
        {
            createClient(state).then(res=>{
                console.log(res);
                    console.log("in here");
                    setSubmit(true);
                    handleClose();
                    setSearchState("");
                    searchClick();
                
            }).catch(err=>{
                console.log(err);
            });

        }

    };
    const handleChange = (event:any) => {
        const value = event.target.value;
        setState({
          ...state,
          [event.target.name]: value,
        });
    };
    const handleChangeKeyword = (event:any) => {
        const value = event.target.value;
        setSearchState(value);
    };
    
    const searchClick=()=>{
            console.log("searchclick",searchKeywordState);
            clickSearch.clickSearch(searchKeywordState);
    }

    return (

        <Box sx={{ flexGrow: 1 }} style={{ marginBottom: "4.25em", marginTop: ".75em" }}>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create New Client
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div>
                                    <TextField
                                        id="firstName"
                                        label="FirstName"
                                        placeholder="FirstName"
                                        value={state.firstName}
                                        onChange={handleChange}
                                        name="firstName"
                                        error={
                                            isSubmit ?
                                                state.firstName===""?true:false:false
                                        }
                                        helperText={
                                            isSubmit?
                                            state.firstName===""?"Firstname is required":"":""
                                        }
                                       
                                    />
                                    <TextField
                                        
                                        label="LastName"
                                        placeholder="LastName"
                                        value={state.lastName}
                                        onChange={handleChange}
                                        name="lastName"
                                        id="lastName"
                                        error={
                                            isSubmit ?
                                                state.lastName===""?true:false:false
                                        }
                                        helperText={
                                            isSubmit?
                                            state.lastName===""?"LastName is required":"":""
                                        }
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Email Address"
                                        placeholder="Email Address"
                                        value={state.email}
                                        onChange={handleChange}
                                        name="email"
                                        id="email"
                                        error={
                                            isSubmit ?
                                                state.email===""?true:false:false
                                        }
                                        helperText={
                                            isSubmit?
                                            state.email===""?"Email is required":"":""
                                        }
                                    />
                                    <TextField
                                        placeholder="Phone Number"
                                        value={state.phoneNumber}
                                        onChange={handleChange}
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        label="Phone Number"
                                        error={
                                            isSubmit ?
                                                state.phoneNumber===""?true:false:false
                                        }
                                        helperText={
                                            isSubmit?
                                            state.phoneNumber===""?"PhoneNumber is required":"":""
                                        }

                                    />
                                </div> 
                                <div style={{ textAlign: "right" }}>
                                    <BootstrapButton variant="contained" onClick={insertClient}>
                                        Create Client
                                    </BootstrapButton>
                                </div>

                            </Box>

                        </Typography>
                    </Box>
                </Modal>
            </div>
            <div style={{ float: "left" }}>
                <TextField
                    placeholder="Search Keyword"
                    onBlur={searchClick}
                    InputProps={
                        {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={searchClick}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { height: "3em" }
                        }

                    }
                    id="keyword"
                    label="Search Keyword"
                    value={searchKeywordState}
                    onChange={handleChangeKeyword}
                    name="keyword"
                />
            </div>
            <div style={{ float: "right" }}>
                {/* <Button variant="contained" onClick={handleOpen}>Create New Client</Button> */}
                <BootstrapButton variant="contained" onClick={handleOpen}>
                    Create New Client
                </BootstrapButton>
            </div>

        </Box>

    );
}
