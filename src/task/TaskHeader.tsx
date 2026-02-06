import type { SyntheticEvent } from "react";
import Button from "../Button";

export interface TaskHeaderProps {
    title: string;
    isEditing: boolean;
    draftTitle: string;
    onDraftTitleChange: (nextTitle: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

function TaskHeader({
    title,
    isEditing,
    draftTitle,
    onDraftTitleChange,
    onSave,
    onCancel,
}: Readonly<TaskHeaderProps>) {
    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave();
    };

    return (
        <header className="card-header">
            {isEditing ? (
                <form className="card-title-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={draftTitle}
                        onChange={(e) => onDraftTitleChange(e.target.value)}
                        autoFocus
                    />
                    <button type="submit">Save</button>
                    <Button
                        type="button"
                        className="card-control"
                        icon="cancel"
                        label="Cancel"
                        onClick={onCancel}
                    />
                </form>
            ) : (
                <p className="card-title">{title}</p>
            )}
        </header>
    );
}

export default TaskHeader;