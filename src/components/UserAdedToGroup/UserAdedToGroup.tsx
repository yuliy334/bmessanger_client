import "./UserAddedToGroupStyle.css"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
interface UserAddedToGroupProps{
    username:string;
    setUsernameList: React.Dispatch<React.SetStateAction<string[]>>;
    usernameList: string[];
}

export function UserAddedToGroup({username,setUsernameList,usernameList}:UserAddedToGroupProps) {

    function handleDelete(){
        usernameList = usernameList.filter((e)=>{
            e!=username
        })
        setUsernameList(usernameList);
    }


    return (
        <div className="UserAddedToGroup">
            {username}
            <ClearRoundedIcon className="deleteUser" onClick={handleDelete}/>
        </div>
    )
}