import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, List, ListItem, Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { Activity } from "./Itinerary";
import { DayIcon } from "./icons/icons";
import { buildVariant } from './theme';
import styled from "@emotion/styled";
import { closestCenter, DndContext, DragOverlay, MouseSensor, TouchSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import colors from "./colors";
import { useDispatch, useSelector } from "react-redux";
import { ActivityPayLoad } from "../../../libs/types/type";
import { setPlanning } from "../../../libs/slices/fengShuiSlice";
import { formatDate } from "../../../libs/utils";

export default function TripDialog({ isMobile, day, realDay }: any) {

    const tripData = useSelector((state: any) => state.fengShui.planning);
    const outTripData = useSelector((state: any) => state.fengShui.outPlanning);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<{ [key: string]: number[] }>({
        sortable1: [],
        sortable2: [], // Start empty
    });

    const dispatch = useDispatch();
    const handleSavedItinerary = () => {
        const payload: ActivityPayLoad = {
            day: day,
            activities: items.sortable2,
            outActivities: items.sortable1
        }
        dispatch(setPlanning(payload));
        handleClose();
    }

    useEffect(() => {
        const filteredItem = tripData?.itinerary?.filter((item: any) => Number(item.day) === Number(day))[0];
        const positions: number[] = filteredItem?.activities?.map((activity: any) => activity.id);
        const outPositions: number[] = outTripData?.map((item: any) => item.id);

        setItems({
            sortable1: outPositions || [],
            sortable2: positions || [],
        });

    }, [tripData, outTripData]);

    const [activeId, setActiveId] = useState(null);

    function handleDragStart(event: any) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;
        if (!over) {
            setActiveId(null);
            return;
        }
        const activeContainer = Object.keys(items).find((key) => items[key].includes(active.id));
        const overContainer = Object.keys(items).find((key) => items[key].includes(over.id)) || over.id;
        if (activeContainer && overContainer) {
            if (activeContainer === overContainer) {
                setItems((prev) => ({
                    ...prev,
                    [activeContainer]: arrayMove(
                        prev[activeContainer],
                        prev[activeContainer].indexOf(active.id),
                        prev[activeContainer].indexOf(over.id)
                    )
                }))
            } else {
                setItems((prev) => {
                    const activeItems = prev[activeContainer].filter((id) => id !== active.id);

                    const overItems = overContainer === over.id
                        ? [...prev[overContainer], active.id] // Add to empty container
                        : [
                            ...prev[overContainer].slice(
                                0,
                                prev[overContainer].indexOf(over.id)
                            ),
                            active.id,
                            ...prev[overContainer].slice(
                                prev[overContainer].indexOf(over.id)
                            ),
                        ];
                    return {
                        ...prev,
                        [activeContainer]: activeItems,
                        [overContainer]: overItems,
                    };
                });

            }

        }
        setActiveId(null);
    }

    const handleAdd = (id: any) => {

        setItems((prev) => {
            const fi = prev.sortable1.filter((item) => item !== id);
            return {
                sortable2: [id, ...prev.sortable2],
                sortable1: fi
            };
        });
    }
    const handleRemove = (id: any) => {
        setItems((prev) => {
            const fi = prev.sortable2.filter((item) => item !== id);
            return {
                sortable1: [id, ...prev.sortable1],
                sortable2: fi
            };
        });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
    );

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '16px',
            }}>
            <Button variant="contained" sx={{ backgroundColor: colors.black, color: colors.white ,borderRadius:'32px',padding:'16px'}} onClick={handleClickOpen} > VIEW LUCKY SEAT NUMBER</Button>
            </Box>
            
            <CustomDialog open={open} fullWidth={true}>
                <DialogTitle>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Typography sx={buildVariant(600, '24', '32')}>Create a day's itinerary</Typography>
                        <ClearIcon onClick={handleClose} />
                    </Box>
                </DialogTitle>
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#F1F1F1',
                    padding: '0px'
                }}>

                    <Grid2 container sx={{ width: '100%', borderRadius: '16px' }} direction={"row-reverse"} >
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}  >

                            <Grid2 size={{ xs: 12, md: 6 }} sx={{ padding: '16px', backgroundColor: 'white' }}>
                                <Box sx={{
                                    display: 'flex',
                                    gap: '8px',

                                }}>
                                    <DayIcon />
                                    <Typography>{realDay}</Typography>
                                </Box>
                                <Box>
                                    <SortableContext items={items.sortable2} strategy={verticalListSortingStrategy}>
                                        <Dropable id={'sortable2'}>
                                            <List sx={{
                                                marginTop: '16px',
                                            }}>
                                                {items.sortable2?.length > 0 ? (
                                                    items.sortable2.map((item) => (
                                                        <SortableItem key={item} id={item} >
                                                            <Activity id={item} isMobile={isMobile} isPop={true} isInIntinerary={true} actions={{ handleAdd, handleRemove }} ></Activity>
                                                        </SortableItem>
                                                    ))
                                                ) : (
                                                    <Box sx={{
                                                        padding: '8px',
                                                        borderRadius: '16px',
                                                        border: "1px solid #DDDDDD",
                                                    }}>
                                                        <Box sx={{
                                                            backgroundColor: '#F7F9FC',
                                                            height: isMobile ? 'auto' : '500px',
                                                            padding: '16px',
                                                            borderRadius: '16px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: "1px dashed #C5CEE0",
                                                        }}>
                                                            <Typography sx={{ ...buildVariant(500, '16', '24', '#838383'), textAlign: 'center' }}>{isMobile ? 'Ấn + để thêm địa điểm' : 'Kéo thả vào đây'}</Typography>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </List>
                                        </Dropable>



                                    </SortableContext>
                                </Box>
                            </Grid2>
                            <SortableContext items={items.sortable1} strategy={verticalListSortingStrategy}>
                                <Grid2 size={{ xs: 12, md: 6 }} sx={{ backgroundColor: 'white', padding: '16px' }}>
                                    <Typography sx={buildVariant(600, '20', '28')}>Destinations list</Typography>
                                    <Box>
                                        <Typography sx={buildVariant(600, '14', '24', '#838383')}>Create a daily itinerary by dragging and dropping suggested destinations</Typography>
                                    </Box>
                                    <List sx={{
                                        maxHeight: '450px',
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        paddingLeft: '0px'

                                    }}>
                                        <Dropable id={'sortable1'}>
                                            {items.sortable1?.length > 0 ? (
                                                items.sortable1.map((item) => (
                                                    <SortableItem key={item} id={item} >
                                                        <Activity id={item} isMobile={isMobile} isPop={true} isInIntinerary={false} actions={{ handleAdd, handleRemove }}  ></Activity>
                                                    </SortableItem>
                                                ))
                                            ) : (
                                                <Box sx={{
                                                    padding: '8px',
                                                    borderRadius: '16px',
                                                    border: "1px solid #DDDDDD",
                                                }}>
                                                    <Box sx={{
                                                        backgroundColor: '#F7F9FC',
                                                        height: isMobile ? 'auto' : '500px',
                                                        padding: '16px',
                                                        borderRadius: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: "1px dashed #C5CEE0",
                                                    }}>
                                                        <Typography sx={{ ...buildVariant(500, '16', '24', '#838383'), textAlign: 'center' }}>Hết địa điểm có thể chọn</Typography>
                                                    </Box>
                                                </Box>
                                            )}
                                        </Dropable>

                                    </List>
                                </Grid2>
                            </SortableContext>


                            <DragOverlay>
                                {activeId ? (
                                    <Activity id={activeId} isMobile={isMobile} />
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        padding: '16px',
                        width: '100%',
                    }}>
                        <Button variant="text" sx={{ color: colors.black, marginRight: '16px' }} onClick={handleClose}>RETURN</Button>
                        <Button variant="contained" sx={{ backgroundColor: colors.black, color: colors.white ,borderRadius:'16px',padding:'16px'}}  onClick={handleSavedItinerary} > SAVE SCHEDULE</Button>
                    </Box>


                </DialogActions>
            </CustomDialog>
        </>
    )
}

const CustomDialog = styled(Dialog)(() => ({
    '& .MuiDialog-paper': {
        maxWidth: '1200px',
        borderRadius: '24px',
        backgroundColor: 'white',
        height: '800px'
    },

}))

function SortableItem(props: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        padding: '8px',
    };
    return (
        <ListItem ref={setNodeRef} {...attributes} {...listeners} style={style}>
            {props.children}
        </ListItem>
    )

}

const Dropable = (props: any) => {

    const { setNodeRef } = useDroppable({
        id: props.id
    });

    return (

        <Box ref={setNodeRef}>
            {props.children}
        </Box>
    )

}