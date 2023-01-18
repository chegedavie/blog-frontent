import { Drawer } from 'antd';
import DrawerTab from './DrawerTab';

export default({setOpen,open,defaultKey}) => {
  //const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  console.log(setOpen)
  return (
      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open} setOpen={setOpen}>
        <DrawerTab defaultKey={defaultKey} setOpen={setOpen}/>
      </Drawer>
  );
};