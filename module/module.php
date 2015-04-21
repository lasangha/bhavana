<?php
/** @file module.php
 * A brief file description.
 * A more elaborated file description.
 */

/** \addtogroup Core 
 *  @{
 */

/**
 * \defgroup Module
 * @{
 */


/**
 * Boot up procedure
 */
function bhavana_bootMeUp(){
	// Just booting up
}

/**
 * Init function
 */
function bhavana_init(){

	$paths = array(
		array(
			'r' => 'causes_get_max_time',
			'action' => 'bhavana_causesGetMaxTime',
			'access' => 'users_openAccess',
			'params' => array()
		),
		array(
			'r' => 'causes_add_to',
			'action' => 'bhavana_causesAddTo',
			'access' => 'users_openAccess',
			'params' => array()
		)
	);

	return $paths;
}

# Cause with maximum meditation
function bhavana_causesGetMaxTime(){

	$q = "SELECT idCause, name, totalTime FROM causes ORDER BY totalTime DESC LIMIT 1";

	$maxCause = db_query($q, 1);

	return $maxCause;

}

// Borrowed from lestatz
function geo_getMeVisitorDetails($ipAddress = ""){

	// Tmp solution
	$details = array();
	$details['latitude'] = rand(-70.0000, 80.0000);
	$details['longitude'] = rand(-70.0000, 80.0000);

	return $details;
}

/**
 * Add times to meditations
 */
function bhavana_causesAddTo(){

	global $user;

	// Load geolocator
	modules_loader('geoloc');

	$idCause = 0;

	# Get the correct id of the cause
	$q = sprintf("SELECT idCause FROM causes WHERE code = '%s'", params_get('causeCode', 1));

	$cause = db_query($q, 1);

	# Where is this person?
	$location = _geoloc_getMeVisitorDetails();

	if($cause->idCause > 0){
		// Register the new time
		$q = sprintf("INSERT INTO `meditations` (`timestamp`, `totalTime`, `idCause`, `idUser`, `coordinates`)
			VALUES ('%s', '%s', '%s', '%s', '%s')",
				time(),
				params_get('totalTime', 10),
				$cause->idCause,
				$user->idUser,
				$location['longitude'] . "," . $location['latitude']
			);

		$r = db_query($q, 0);

		# Update total times
		$q = sprintf("UPDATE causes SET totalTime = totalTime + %s WHERE idCause = '%s'", params_get('totalTime',10), $cause->idCause);
		$r = db_query($q, 0);
	}

	// I will just say it worked, not much to do if it did not.
	return SUCCESS_ALL_GOOD;

}
/**@}*/
/** @}*/
