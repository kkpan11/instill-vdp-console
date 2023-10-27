import { Nullable } from "../../../lib";
import { getAudioTypeFromBase64 } from "../lib";
import { ConnectorNodeFieldRoot, EndNodeFieldRoot } from "./FieldRoot";

export type AudioFieldProps = {
	nodeType: "end" | "connector";
	title: Nullable<string>;
	audio: Nullable<string>;
};

export const AudioField = (props: AudioFieldProps) => {
	const { nodeType, title, audio } = props;

	const audioType = audio ? getAudioTypeFromBase64(audio) : null;

	if (nodeType === "connector") {
		return (
			<ConnectorNodeFieldRoot title={title} key={`${title}-field`}>
				<div className="flex w-full">
					{audio ? (
						<audio
							className="w-full"
							controls={true}
							src={`data:audio/${audioType};base64,${audio}`}
						/>
					) : (
						<></>
					)}
				</div>
			</ConnectorNodeFieldRoot>
		);
	}

	return (
		<EndNodeFieldRoot title={title} key={`${title}-field`}>
			<div className="flex w-full">
				{audio ? (
					<audio
						className="w-full"
						controls={true}
						src={`data:audio/${audioType};base64,${audio}`}
					/>
				) : (
					<></>
				)}
			</div>
		</EndNodeFieldRoot>
	);
};
